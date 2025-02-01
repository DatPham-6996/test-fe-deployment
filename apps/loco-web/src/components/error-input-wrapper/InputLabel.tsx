type InputLabelProps = {
  title: string;
  required?: boolean;
};

export function InputLabel({ title, required }: InputLabelProps) {
  return (
    <p className="text-sm font-medium">
      {title} {required && <span className="text-red-500">*</span>}
    </p>
  );
}
