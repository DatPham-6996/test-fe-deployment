'use client';

import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { useIntl } from 'react-intl';
import { Button } from '@/components/shadcn/ui/button';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, useFormField } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { Switch } from '@/components/shadcn/ui/switch';
import { PercentIcon, XIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import classNames from 'classnames';
import { formatTimeAndDate } from '@/lib/utils/time-format';
import { Calendar } from '@/components/shadcn/ui/calendar';
import { TimePicker } from '@/components/time-picker/time-picker';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { enUS, vi } from 'date-fns/locale';
import { useCreateDiscountsMutation, useUpdateDiscountsMutation } from '@/lib/__generated__/graphql';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { useRecoilValue } from 'recoil';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';
import { ApolloError } from '@apollo/client';

export enum DiscountEditorDialogMode {
  Create = 'create',
  Edit = 'edit',
}

const DiscountCreateUpdateSchema = z
  .object({
    id: z.string().optional(),
    code: z
      .string()
      .min(2, { message: 'promotion.discount.editor.codeMinLength' })
      .max(100, { message: 'promotion.discount.editor.codeMaxLength' }),
    type: z.enum(['percentage', 'fixed']),
    value: z
      .number({ message: 'promotion.discount.editor.valueMustBeAPositiveNumber' })
      .positive({ message: 'promotion.discount.editor.valueMustBeAPositiveNumber' }),
    allocation: z.enum(['total', 'item']),
    startDate: z.date(),
    endDate: z.date().optional(),
    enableUsageLimit: z.boolean(),
    usageLimit: z.optional(
      z
        .number({ message: 'promotion.discount.editor.valueMustBeAPositiveNumber' })
        .positive({ message: 'promotion.discount.editor.valueMustBeAPositiveNumber' })
    ),
    isDisabled: z.boolean(),
  })
  .refine((data) => (data.endDate ? data.endDate > data.startDate : true), {
    message: 'promotion.discount.editor.endDateAfterStartDate',
    path: ['endDate'],
  })
  .refine((data) => (data.enableUsageLimit ? data.usageLimit && data.usageLimit > 0 : true), {
    message: 'promotion.discount.editor.usageLimitRequired',
    path: ['usageLimit'],
  })
  .refine((data) => (data.type === 'percentage' ? data.value > 0 && data.value < 100 : data.value > 0), {
    message: 'promotion.discount.editor.valueRange',
    path: ['value'],
  });

export function DiscountEditorDialog({
  onRefresh,
  data,
  mode,
}: {
  onRefresh: () => any;
  data?: z.infer<typeof DiscountCreateUpdateSchema>;
  mode: DiscountEditorDialogMode;
}) {
  if (mode === DiscountEditorDialogMode.Edit && !data) {
    throw new Error('Discount is required for edit mode');
  }

  const currentEvent = useRecoilValue(currentEventState);
  const currentOrg = useRecoilValue(currentOrgState);

  const form = useForm<z.infer<typeof DiscountCreateUpdateSchema>>({
    resolver: zodResolver(DiscountCreateUpdateSchema),
    defaultValues: {
      id: '',
      code: '',
      type: 'percentage',
      value: undefined,
      allocation: 'total',
      startDate: DateTime.now().toJSDate(),
      endDate: undefined,
      isDisabled: false,
      enableUsageLimit: false,
      usageLimit: undefined,
    },
    values: data
      ? {
          id: data.id,
          code: data.code,
          type: data.type,
          value: data.value,
          allocation: data.allocation,
          startDate: data.startDate,
          isDisabled: data.isDisabled,
          endDate: data.endDate,
          usageLimit: data.usageLimit,
          enableUsageLimit: data.enableUsageLimit,
        }
      : undefined,
  });

  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const { locale } = useLocale();
  const dateLocale = locale === 'vi' ? vi : enUS;

  const [createDiscount] = useCreateDiscountsMutation();
  const [updateDiscount] = useUpdateDiscountsMutation();
  const eventId = currentEvent?.id;
  const organizationId = currentOrg?.id;

  const performCreateDiscount = async (values: z.infer<typeof DiscountCreateUpdateSchema>) => {
    if (!eventId || !organizationId) {
      throw new Error('Event and organization is required to create discount');
    }

    await createDiscount({
      variables: {
        input: {
          eventId,
          organizationId,
          code: values.code,
          startsAt: values.startDate,
          endsAt: values.endDate ?? null,
          usageLimit: values.enableUsageLimit ? values.usageLimit : null,
          isDisabled: values.isDisabled,
          rule: { allocation: values.allocation, type: values.type, value: values.value },
        },
      },
    });

    toastSuccess(formatMessage({ id: 'promotion.discount.editor.createSuccess' }));
  };

  const performUpdateDiscount = async (values: z.infer<typeof DiscountCreateUpdateSchema>) => {
    if (!values.id) {
      throw new Error('Discount id is required for update');
    }

    if (!eventId || !organizationId) {
      throw new Error('Event and organization is required to create discount');
    }

    await updateDiscount({
      variables: {
        input: {
          eventId,
          organizationId,
          discountId: values.id,
          code: values.code,
          startsAt: values.startDate,
          endsAt: values.endDate ?? null,
          usageLimit: values.enableUsageLimit ? values.usageLimit : null,
          isDisabled: values.isDisabled,
          rule: { allocation: values.allocation, type: values.type, value: values.value },
        },
      },
    });

    toastSuccess(formatMessage({ id: 'promotion.discount.editor.updateSuccess' }));
  };

  const onSubmit = async (values: z.infer<typeof DiscountCreateUpdateSchema>) => {
    try {
      if (mode === DiscountEditorDialogMode.Create) {
        await performCreateDiscount(values);
      } else {
        await performUpdateDiscount(values);
      }
      onRefresh();
      closeDialog();
    } catch (error) {
      if (error instanceof ApolloError) {
        toastError(error.message);
      } else {
        toastError(formatMessage({ id: 'common.error' }));
      }
      console.error('[DiscountEditorDialog] Failed to create/update discount:', error);
    }
  };

  const DiscountFormMessage = ({ defaultMessage }: { defaultMessage?: string }) => {
    const { error, formMessageId } = useFormField();
    const body = error ? formatMessage({ id: String(error?.message) }) : defaultMessage;

    if (!body) {
      return null;
    }

    return (
      <p
        id={formMessageId}
        className={classNames('text-[0.8rem] font-medium', error ? 'text-destructive' : 'text-blue-500')}
      >
        {body}
      </p>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-3xl font-semibold my-4">
          {formatMessage({
            id:
              mode === DiscountEditorDialogMode.Create
                ? 'promotion.discount.editor.create'
                : 'promotion.discount.editor.edit',
          })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'promotion.discount.editor.code' })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formatMessage({ id: 'promotion.discount.editor.codePlaceholder' })}
                      {...field}
                    />
                  </FormControl>
                  <DiscountFormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormLabel className="text-base font-medium">
                {formatMessage({ id: 'promotion.discount.editor.type' })}
              </FormLabel>
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    console.log('field value', field.value);
                    return (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={(value) => {
                              if (value !== '' && value !== undefined && value !== field.value) {
                                field.onChange(value);
                              }
                            }}
                            disabled={mode === DiscountEditorDialogMode.Edit}
                          >
                            <SelectTrigger className="w-32 h-12 rounded-r-none text-base">
                              <SelectValue placeholder={formatMessage({ id: 'promotion.discount.editor.type' })} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="percentage">
                                  {formatMessage({ id: 'promotion.discount.editor.percentage' })}
                                </SelectItem>
                                <SelectItem value="fixed">
                                  {formatMessage({ id: 'promotion.discount.editor.fixed' })}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <DiscountFormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center mb-2">
                            <Input
                              placeholder={formatMessage({ id: 'promotion.discount.editor.valuePlaceholder' })}
                              type="number"
                              {...field}
                              onChange={(e) => {
                                if (e.target.value === '') {
                                  field.onChange(undefined);
                                } else {
                                  field.onChange(Number(e.target.value));
                                }
                              }}
                              className="rounded-r-none rounded-l-none"
                            />
                            <div className="w-16 h-12 bg-gray-100 dark:bg-card border rounded-r-md content-center justify-items-center">
                              {form.getValues('type') === 'percentage' ? (
                                <PercentIcon size={18} />
                              ) : (
                                <p className="text-sm font-medium">VNĐ</p>
                              )}
                            </div>
                          </div>
                          <DiscountFormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="enableUsageLimit"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center gap-2">
                      <FormLabel className="text-base font-medium grow">
                        {formatMessage({ id: 'promotion.discount.editor.usageLimit' })}
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              if (!value) {
                                form.setValue('usageLimit', undefined);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <DiscountFormMessage />
                  </FormItem>
                )}
              />
              {form.getValues('enableUsageLimit') && (
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={formatMessage({ id: 'promotion.discount.editor.usageLimitPlaceholder' })}
                          type="number"
                          {...field}
                          onChange={(e) => {
                            if (e.target.value === '') {
                              field.onChange(undefined);
                            } else {
                              field.onChange(Number(e.target.value));
                            }
                          }}
                        />
                      </FormControl>
                      <DiscountFormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <FormLabel className="text-base font-medium">
                {formatMessage({ id: 'promotion.discount.editor.timeRange' })}
              </FormLabel>
              <div className="flex flex-row gap-3">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-normal">
                        {formatMessage({ id: 'promotion.discount.editor.startDate' })}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={classNames(
                                'w-full h-12 pl-3 text-left',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <span className="font-normal text-base">
                                {field.value
                                  ? `${formatTimeAndDate(DateTime.fromJSDate(field.value), locale)}`
                                  : `${formatMessage({ id: 'promotion.discount.editor.pickDate' })}`}
                              </span>
                              <div className="w-full" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            locale={dateLocale}
                            initialFocus
                            className="border-b"
                          />
                          <div className="p-3 w-[250px]">
                            <TimePicker setDate={field.onChange} date={field.value} />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <DiscountFormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-normal">
                        {formatMessage({ id: 'promotion.discount.editor.endDate' })}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={classNames('w-full h-12 pl-3', !field.value && 'text-muted-foreground')}
                            >
                              <span className="font-normal text-base text-start">
                                {field.value
                                  ? `${formatTimeAndDate(DateTime.fromJSDate(field.value), locale)}`
                                  : `${formatMessage({ id: 'promotion.discount.editor.pickDate' })}`}
                              </span>
                              {field.value ? (
                                <XIcon
                                  className="ml-2 h-4 w-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    form.setValue('endDate', undefined);
                                  }}
                                />
                              ) : (
                                <div className="w-full" />
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            locale={dateLocale}
                            initialFocus
                            className="border-b"
                            disabled={(date) => date < new Date('1900-01-01')}
                          />
                          <div className="p-3 w-[250px]">
                            <TimePicker setDate={field.onChange} date={field.value} />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <DiscountFormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isDisabled"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="text-base font-medium grow">
                      {formatMessage({ id: 'promotion.discount.editor.enabledStatus' })}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id={field.name}
                        checked={!field.value}
                        onCheckedChange={(value) => field.onChange(!value)}
                      />
                    </FormControl>
                    <p className="text-sm text-foreground">
                      {formatMessage({
                        id: !field.value
                          ? 'promotion.discount.editor.enabledStatusOn'
                          : 'promotion.discount.editor.enabledStatusOff',
                      })}
                    </p>
                  </div>
                  <DiscountFormMessage />
                </FormItem>
              )}
            />

            <Button className="mb-2 w-min" size={'lg'} type="submit" loading={form.formState.isSubmitting}>
              {formatMessage({ id: 'promotion.discount.editor.confirm' })}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
