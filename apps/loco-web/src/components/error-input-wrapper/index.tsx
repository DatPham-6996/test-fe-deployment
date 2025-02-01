import { FieldRenderProps } from 'react-final-form';
import { ExclamationTriangle } from '../icon';

type ErrorWrapperProps = {
  field: FieldRenderProps<any, HTMLElement, any>;
  children: React.ReactNode;
};

export function ErrorInputWrapper({ field, children }: ErrorWrapperProps) {
  return (
    <div>
      {children}
      {field.meta.touched && field.meta.error && (
        <div className="flex gap-1 mt-2 items-center">
          <ExclamationTriangle className="stroke-red-600" />
          <p className="text-red-600 text-xs">{field.meta.error}</p>
        </div>
      )}
    </div>
  );
}
