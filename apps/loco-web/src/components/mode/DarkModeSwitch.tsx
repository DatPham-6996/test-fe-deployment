import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIntl } from 'react-intl';
import { Label } from '../shadcn/ui/label';
import { RadioGroup, RadioGroupItem } from '../shadcn/ui/radio-group';

export function DarkModeSwitch({ showLabel = false }: { showLabel?: boolean }) {
  const { formatMessage } = useIntl();
  const { setTheme, theme, systemTheme } = useTheme();

  return (
    <div className="flex-col dark:text-neutral-100 text-neutral-600 flex justify-center items-center gap-2 w-full">
      {showLabel && <Label htmlFor="english-mode">{formatMessage({ id: 'settings.darkMode' })}</Label>}
      <RadioGroup defaultValue={theme} onValueChange={(value) => setTheme(value)} className='w-full'>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <Label htmlFor="light" className="flex items-center cursor-pointer gap-1">
            <Sun className="w-5 h-5 mr-2" />
            <div className="font-medium">{formatMessage({ id: 'mode.light' })}</div>
          </Label>
          <RadioGroupItem value="light" id="light" />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <Label htmlFor="dark" className="flex items-center cursor-pointer gap-1">
            <Moon className="w-5 h-5 mr-2" />
            <div className="font-medium">{formatMessage({ id: 'mode.dark' })}</div>
          </Label>
          <RadioGroupItem value="dark" id="dark" />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <Label htmlFor="system" className="flex items-center cursor-pointer gap-1">
            <Laptop className="w-5 h-5 mr-2" />
            <div className="font-medium">{formatMessage({ id: 'mode.system' })}</div>
          </Label>
          <RadioGroupItem value="system" id="system" />
        </div>
      </RadioGroup>
    </div >
  );
}
