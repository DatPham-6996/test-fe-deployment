import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Switch } from '@/components/shadcn/ui/switch';

type SettingToggleProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  enabled?: boolean;
};

export default function SettingToggle({ title, description, value, onChange, enabled = true }: SettingToggleProps) {
  return (
    <Card className="w-full lg:w-1/2 dark:bg-muted">
      <div className="flex flex-row justify-between items-start mx-6 my-5">
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="">{description}</CardDescription>
        </div>
        <Switch className='ml-24' checked={value} onCheckedChange={onChange} disabled={!enabled} />
      </div>
    </Card>
  );
}
