'use client';

import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/shadcn/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { TimeSelect } from '@/components/time-picker/TimeSelect';
import { useCreateExternalEventMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { enUS, vi } from 'date-fns/locale';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

type Props = {
  organizationId?: string;
  artistHandle: string;
};
export default function CreateExternalEventForm({ organizationId, artistHandle }: Props) {
  const intl = useIntl();
  const { locale } = useLocale();
  const { closeDialog } = useResponsiveDialog();
  const dateLocale = locale === 'vi' ? vi : enUS;
  const [create, { loading }] = useCreateExternalEventMutation();

  const FormSchema = z.object({
    name: z
      .string({
        required_error: intl.formatMessage({ id: 'organizer.event.validation.nameRequired' }),
      })
      .min(1, { message: intl.formatMessage({ id: 'organizer.event.validation.nameRequired' }) }),
    address: z.string().min(1),
    startAt: z.date({
      required_error: intl.formatMessage({ id: 'organizer.event.validation.startDateRequired' }),
    }),
    endAt: z.date({
      required_error: intl.formatMessage({ id: 'organizer.event.validation.endDateRequired' }),
    }),
    ticketUrl: z.string().url(),
    image: z.string().url(),
    organizationName: z.string(),
  });

  type FormType = z.infer<typeof FormSchema>;

  const defaultValues: FormType = {
    name: '',
    address: '',
    startAt: new Date(),
    endAt: new Date(),
    ticketUrl: '',
    image: '',
    organizationName: '',
  };

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    console.log('Form values:', values);

    try {
      await create({
        variables: {
          data: {
            name: values.name,
            address: values.address,
            startAt: new Date(values.startAt).toISOString(),
            endAt: new Date(values.endAt).toISOString(),
            ticketUrl: values.ticketUrl,
            media: [
              values.image && values.image?.length > 0
                ? values.image
                : 'https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/events/event-1/73bd38f3-0e3d-4edc-a8b8-69d0d3e2b918.webp',
            ],
            organizationName: values.organizationName,
            artistHandle: artistHandle,
          },
        },
        onCompleted: () => {
          toastSuccess(intl.formatMessage({ id: 'externalEvent.created' }));
          closeDialog();
        },
        onError: () => {
          toastError(intl.formatMessage({ id: 'externalEvent.error' }));
        },
      });
    } catch (error) {
      toastError(intl.formatMessage({ id: 'externalEvent.error' }));
    }
  };
  const TimeSelectField = ({ fieldName }: { fieldName: 'startAt' | 'endAt' }) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{intl.formatMessage({ id: 'externalEvent.header' })}</DialogTitle>
          <DialogDescription>{intl.formatMessage({ id: 'externalEvent.subtitle' })}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl.formatMessage({ id: 'externalEvent.title' })}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl.formatMessage({ id: 'externalEvent.location' })}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full">
            <div className="flex-grow">{intl.formatMessage({ id: 'externalEvent.start-time' })}</div>
            <TimeSelectField fieldName="startAt" />
          </div>
          <div className="flex items-center w-full">
            <div className="flex-grow">{intl.formatMessage({ id: 'externalEvent.end-time' })}</div>
            <TimeSelectField fieldName="endAt" />
          </div>

          <FormField
            control={form.control}
            name="ticketUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl.formatMessage({ id: 'externalEvent.ticketUrl' })}</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl.formatMessage({ id: 'externalEvent.image' })}</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="Must be a flivnewbucket url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{intl.formatMessage({ id: 'externalEvent.organizer' })}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading}>
            {intl.formatMessage({ id: 'externalEvent.cta' })}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
