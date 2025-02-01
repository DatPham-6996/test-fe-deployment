'use client';

import { Card } from '@/components/card';
import { Accordion, AccordionContent, AccordionItem } from '@/components/shadcn/ui/accordion';
import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import TextEditor from '@/components/text-editor/TextEditor';
import { TimeSelect } from '@/components/time-picker/TimeSelect';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import {
  MediaType,
  useCreateEventMutation,
  useGetOrganizationImageUploadLinkLazyQuery,
} from '@/lib/__generated__/graphql';
import { putS3ObjectUsingPresignedUrl } from '@/lib/api/s3/presigned-url-upload';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdvancedMarker, APIProvider, Map, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { enUS, vi } from 'date-fns/locale';
import { ChevronDownIcon, ChevronUpIcon, DotIcon, ImageIcon, MapPinIcon, TheaterIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import MapHandler from '../../components/MapHandler';
import PlaceAutocomplete from '../../components/PlaceAutocomplete';

import { useGateValue } from '@statsig/react-bindings';
import { addMinutes, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { isMobile } from 'react-device-detect';
import './styles.css';

const GG_API_KEY = process.env.NEXT_PUBLIC_GMAP_KEY ?? '';

const EventForm = () => {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const router = useRouter();
  const dateLocale = locale === 'vi' ? vi : enUS;
  const [currentOrg] = useRecoilState(currentOrgState);
  const [getOrganizationImageUploadLink] = useGetOrganizationImageUploadLinkLazyQuery();
  const [createEvent] = useCreateEventMutation();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isInputLocationOpen, setIsInputLocationOpen] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const isFlipTest = useGateValue('flip_prod_test');

  useEffect(() => {
    if (!currentOrg || !isFlipTest) {
      router.push('/organizer');
    }
  }, [currentOrg, router, isFlipTest]);

  const getDefaultTime = ({ defaultDate }: { defaultDate: Date }): Date => {
    const currentMinutes = getMinutes(defaultDate);
    const roundedMinutes = currentMinutes < 15 ? 0 : currentMinutes < 45 ? 30 : 0;
    const roundedTime = setMinutes(
      setHours(defaultDate, getHours(defaultDate) + (currentMinutes >= 45 ? 1 : 0)),
      roundedMinutes
    );

    return roundedTime;
  };

  const DEFAULT_COVER_URL =
    'https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/events/event-1/73bd38f3-0e3d-4edc-a8b8-69d0d3e2b918.webp';

  const formSchema = z.object({
    name: z.string({
      required_error: formatMessage({ id: 'organizer.event.validation.nameRequired' }),
    }),
    description: z.string({
      required_error: formatMessage({ id: 'organizer.event.validation.descriptionRequired' }),
    }),
    startAt: z.date({
      required_error: formatMessage({ id: 'organizer.event.validation.startDateRequired' }),
    }),
    endAt: z.date({
      required_error: formatMessage({ id: 'organizer.event.validation.endDateRequired' }),
    }),
    location: z.object({
      address: z.string(),
      city: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    onSale: z.date().optional(),
    offSale: z.date().optional(),
    organizationId: z.string(),
    maxTicketPerOrder: z.number(),
    hasSeatMap: z.boolean(),
    media: z.array(
      z.object({
        url: z.string().url(),
        type: z.enum(['IMAGE', 'VIDEO']),
        isCover: z.boolean(),
      })
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = {
    startAt: getDefaultTime({ defaultDate: new Date() }),
    endAt: getDefaultTime({ defaultDate: addMinutes(new Date(), 60) }),
    organizationId: currentOrg?.id,
    maxTicketPerOrder: 10,
    hasSeatMap: false,
    media: [
      {
        url: `${DEFAULT_COVER_URL}?timestamp=${Date.now()}`,
        type: MediaType.Image,
        isCover: true,
      },
    ],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const resetForm = () => {
    form.reset(defaultValues);
    form.setValue('name', '');
    form.setValue('description', '');
    setSelectedPlace(null);
    setIsEditorOpen(false);
    setIsInputLocationOpen(false);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const { media, ...rest } = values;
      await createEvent({
        variables: {
          data: {
            ...rest,
            media: media.map((item) => ({
              ...item,
              type: item.type as MediaType,
            })),
          },
        },
      });
      toastSuccess(formatMessage({ id: 'organizer.event.createSuccess' }));

      resetForm();
    } catch (error) {
      console.log(error);
      toastError(formatMessage({ id: 'common.error' }));
    }
  };

  const TimeSelectField = ({ fieldName }: { fieldName: 'startAt' | 'endAt' | 'onSale' | 'offSale' }) => {
    return (
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col flex-1 w-full m-1 gap-[2px]">
            <TimeSelect value={field.value} onChange={field.onChange} locale={locale} dateLocale={dateLocale} />
          </FormItem>
        )}
      />
    );
  };

  const getAddressComponent = (
    components: google.maps.GeocoderAddressComponent[] | undefined,
    type: string
  ): string => {
    if (!components) return '';
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : '';
  };

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (!place || !place.geometry?.location) return;

    const location = {
      address: place.formatted_address || '',
      city:
        getAddressComponent(place.address_components, 'locality') ||
        getAddressComponent(place.address_components, 'administrative_area_level_1') ||
        '',
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    setSelectedPlace(place);
    form.setValue('location', location);
    setIsInputLocationOpen(false);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        const { data } = await getOrganizationImageUploadLink({
          variables: {
            input: {
              fileName: file.name,
              organizationId: currentOrg?.id ?? '',
            },
          },
          fetchPolicy: 'no-cache',
        });

        if (!data) {
          console.error('Failed to get upload URL');
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string;
          form.setValue('media', [
            {
              url: dataUrl,
              type: 'IMAGE',
              isCover: true,
            },
          ]);

          const base64Data = dataUrl.split('base64,')[1];

          await putS3ObjectUsingPresignedUrl({
            uploadUrl: data.getOrganizationImageUploadLink.uploadUrl,
            base64Data: base64Data,
            type: data.getOrganizationImageUploadLink.type,
          });

          form.setValue('media', [
            {
              url: data.getOrganizationImageUploadLink.url,
              type: 'IMAGE',
              isCover: true,
            },
          ]);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    [form, getOrganizationImageUploadLink, currentOrg]
  );

  const eventLocation = (
    <>
      <div className="mx-5 my-4 cursor-pointer" onClick={() => setIsInputLocationOpen(!isInputLocationOpen)}>
        <div className="bg-secondary rounded-sm flex gap-2 p-2">
          <MapPinIcon size={16} className="mt-1" />
          <div className="flex-col flex-grow">
            <div>{selectedPlace?.name || formatMessage({ id: 'organizer.event.location' })}</div>
            <div className="font-extralight">
              {selectedPlace?.formatted_address || formatMessage({ id: 'organizer.event.addLocation' })}
            </div>
          </div>
          <div className="items-center flex m-2">
            {isInputLocationOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </div>
      </div>
      <APIProvider apiKey={GG_API_KEY}>
        <Accordion type="single" collapsible value={isInputLocationOpen ? 'locationInput' : undefined}>
          <AccordionItem value="locationInput">
            <AccordionContent>
              <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {selectedPlace && (
          <div className="mt-2 border rounded-sm overflow-hidden mx-5">
            <Map
              mapId={'d68481426726b215'}
              defaultZoom={25}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              className={'w-full h-44'}
            >
              <AdvancedMarker ref={markerRef} position={null} />
            </Map>
          </div>
        )}
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
    </>
  );

  const EventDescription = (
    <>
      <div className="w-full px-5 my-4 min-h-50 cursor-pointer" onClick={() => setIsEditorOpen(!isEditorOpen)}>
        <div className="bg-secondary rounded-sm flex gap-2 p-2">
          <TheaterIcon size={16} className="mt-1" />
          <div className="flex-col flex-grow">
            <div>{formatMessage({ id: 'organizer.event.description' })}</div>
            <div className="font-extralight">{formatMessage({ id: 'organizer.event.addDescription' })}</div>
          </div>
          <div className="items-center flex m-2">
            {isEditorOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="" value={isEditorOpen ? 'descriptionEditor' : undefined}>
        <AccordionItem value="descriptionEditor">
          <AccordionContent>
            <div className="px-5 pt-1">
              <TextEditor
                value={form.getValues('description')}
                setValue={(value) => form.setValue('description', value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );

  return (
    <ContentCenterNarrow>
      <div className="px-0 container mx-auto">
        <div className="p-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
              <Card className="pt-0">
                <div className="flex flex-col justify-center h-52 md:h-[420px] px-2 pt-2">
                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <div className="w-full h-full">
                        <Dropzone onDrop={onDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <section className="w-full h-full flex items-center justify-center cursor-pointer">
                              <div
                                {...getRootProps()}
                                className="w-full h-full relative flex justify-center items-center "
                              >
                                <input {...getInputProps()} />

                                <Image
                                  alt="event-cover"
                                  src={field.value[0].url}
                                  width={936}
                                  height={468}
                                  className="rounded-md h-full w-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="w-full h-full absolute inset-0 bg-white/0 hover:bg-white/20 rounded-md transition duration-300"></div>

                                <Button
                                  className={`absolute bottom-4 right-5 border-2 ${isMobile ? 'rounded-full p-0' : ''}`}
                                  type="button"
                                >
                                  <ImageIcon size={20} className={isMobile ? 'm-2' : 'mr-1'} />
                                  {!isMobile && <div>{formatMessage({ id: 'organizer.event.updateCoverPhoto' })}</div>}
                                </Button>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    )}
                  />
                </div>
                <div className="mt-5 px-2 mb-10">
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl className="w-full">
                                <Input
                                  className="focus-visible:ring-transparent border-none shadow-none text-3xl font-semibold"
                                  placeholder={formatMessage({ id: 'organizer.event.name' })}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 mx-5 gap-3 md:grid-cols-2">
                  <div className="bg-secondary/50 w-full pl-1 rounded-sm">
                    <div className="flex items-center w-full">
                      <DotIcon size={32} />
                      <div className="flex-grow">{formatMessage({ id: 'organizer.event.startsAt' })}</div>
                      <TimeSelectField fieldName="startAt" />
                    </div>
                    <div className="flex items-center">
                      <DotIcon size={32} />
                      <div className="flex-grow">{formatMessage({ id: 'organizer.event.endsAt' })}</div>
                      <TimeSelectField fieldName="endAt" />
                    </div>
                  </div>
                  <div className="bg-secondary/50 w-full pl-1 rounded-sm">
                    <div className="flex items-center">
                      <DotIcon size={32} />
                      <div className="flex-grow">{formatMessage({ id: 'organizer.event.onSale' })}</div>
                      <TimeSelectField fieldName="onSale" />
                    </div>
                    <div className="flex items-center">
                      <DotIcon size={32} />
                      <div className="flex-grow">{formatMessage({ id: 'organizer.event.offSale' })}</div>
                      <TimeSelectField fieldName="offSale" />
                    </div>
                  </div>
                </div>
                {eventLocation}
                {EventDescription}

                <div className="mx-5 mt-5 mb-2 box-border">
                  <Button type="submit" className="w-full" loading={form.formState.isSubmitting} size="lg">
                    {formatMessage({ id: 'organizer.event.create' })}
                  </Button>
                </div>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </ContentCenterNarrow>
  );
};

export default EventForm;
