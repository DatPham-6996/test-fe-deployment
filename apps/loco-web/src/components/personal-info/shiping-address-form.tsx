'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';

export const AddressForm = ({ shippingAddress }: { shippingAddress?: string }) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();

  const formSchema = yup.object({
    shippingAddress: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      shippingAddress,
    },
  });

  const onSubmit = async () => {
    closeDialog();
  };

  return (
    <>
      <div className="flex flex-col pb-2">
        <p className="text-3xl font-medium mt-8">Địa chỉ giao hàng</p>
        <p className="text-muted-foreground text-base font-normal">Cập nhật địa chỉ giao hàng</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="shippingAddress" className="text-sm font-medium">
                  Tỉnh, thành phố
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Nhập tỉnh, thành phố" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="shippingAddress" className="text-sm font-medium">
                  Quận
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Nhập quận" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="shippingAddress" className="text-sm font-medium">
                  Phường
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Nhập phường" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="shippingAddress" className="text-sm font-medium">
                  Địa chỉ
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Cập nhật
          </Button>
        </form>
      </Form>
    </>
  );
};
