import { ErrorInputWrapper } from '@/components/error-input-wrapper';
import { InputLabel } from '@/components/error-input-wrapper/InputLabel';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/ui/select';
import { useCities, useGetDistricts, useGetWards } from '@/state-management/hooks/ghn';
import { useEffect } from 'react';
import { Field, useForm, useFormState } from 'react-final-form';
import { useIntl } from 'react-intl';

// HCM
export const DEFAULT_CITY = {
  id: '202',
  name: 'Hồ Chí Minh',
};

// TODO: When we introduce the shipping address
// we will use this component
export function ReceiverInformationFieldGHN() {
  const intl = useIntl();
  const { values, submitting, submitSucceeded, submitError } = useFormState();
  const form = useForm();
  const { formatMessage } = intl;
  const { city = DEFAULT_CITY, district, ward } = values;

  const { cities } = useCities();
  const { districts } = useGetDistricts(city.id);
  const selectedDistrict = district || districts?.[0];
  const { wards } = useGetWards(selectedDistrict?.id);
  const selectedWard = ward || wards?.[0];

  useEffect(() => {
    if (!city) {
      form.change('city', city);
    }

    if (!district) {
      form.change('district', selectedDistrict);
    }

    if (!ward) {
      form.change('ward', selectedWard);
    }
  }, [city, district, form, selectedDistrict, selectedWard, ward]);

  const onCityChange = (value: string) => {
    form.change('city', {
      id: value,
      name: cities?.find((city) => city.id === value)?.name,
    });
    form.change('district', undefined);
    form.change('ward', undefined);
  };

  const onDistrictChange = (value: string) => {
    form.change(
      'district',
      value
        ? {
          id: value,
          name: districts?.find((district) => district.id === value)?.name,
        }
        : undefined
    );
    form.change('ward', undefined);
  };

  const onWardChange = (value: string) => {
    form.change(
      'ward',
      value
        ? {
          id: value,
          name: wards?.find((ward) => ward.id === value)?.name,
        }
        : undefined
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <InputLabel title={formatMessage({ id: 'checkout.form.name' })} />
        <Field name="name" required>
          {(field) => (
            <ErrorInputWrapper field={field}>
              <Input
                disabled={submitting}
                placeholder={formatMessage({ id: 'checkout.form.namePlaceholder' })}
                {...field.input}
                type="text"
              />
            </ErrorInputWrapper>
          )}
        </Field>
      </div>

      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.email' })} />
          <Field name="email" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Input
                  disabled={submitting}
                  placeholder={formatMessage({ id: 'checkout.form.emailPlaceholder' })}
                  {...field.input}
                  type="email"
                />
              </ErrorInputWrapper>
            )}
          </Field>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.phone' })} />
          <Field name="phone" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Input
                  disabled={submitting}
                  placeholder={formatMessage({ id: 'checkout.form.phonePlaceholder' })}
                  {...field.input}
                  type="tel"
                />
              </ErrorInputWrapper>
            )}
          </Field>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.city' })} />
          <Field name="city" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Select
                  value={city.id}
                  defaultValue={DEFAULT_CITY.id}
                  onValueChange={onCityChange}
                  disabled={submitting}
                >
                  <SelectTrigger className="w-full" />
                  <SelectContent>
                    {cities?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ErrorInputWrapper>
            )}
          </Field>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.district' })} />
          <Field name="district" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Select value={selectedDistrict?.id} onValueChange={onDistrictChange} disabled={submitting}>
                  <SelectTrigger className="w-full" />
                  <SelectContent>
                    {districts?.map((district) => {
                      return (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </ErrorInputWrapper>
            )}
          </Field>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.ward' })} />
          <Field name="ward" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Select value={selectedWard?.id} onValueChange={onWardChange} disabled={submitting}>
                  <SelectTrigger className="w-full" />
                  <SelectContent>
                    {wards?.map((ward) => (
                      <SelectItem key={ward.id} value={ward.id}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ErrorInputWrapper>
            )}
          </Field>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <InputLabel title={formatMessage({ id: 'checkout.form.address' })} />
          <Field name="address" required>
            {(field) => (
              <ErrorInputWrapper field={field}>
                <Input
                  disabled={submitting}
                  placeholder={formatMessage({ id: 'checkout.form.addressPlaceholder' })}
                  {...field.input}
                  type="text"
                />
              </ErrorInputWrapper>
            )}
          </Field>
        </div>
      </div>

      <div className="flex">
        <Button loading={submitting} error={submitError} success={submitSucceeded}>
          {formatMessage({ id: 'checkout.form.save' })}
        </Button>
      </div>
    </div>
  );
}
