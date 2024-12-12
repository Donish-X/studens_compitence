import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type CardProps = React.ComponentProps<typeof Card>;

interface Scheduler {
  dayOfWeek: string;
  teacher: string;
  items: {
    subject: string;
    teacherName: string;
    room: number;
  }[];
}

type SchedulerCardProps = CardProps & {
  scheduler: Scheduler;
  date: string;
};

export function SchedulerCard({ scheduler, className, ...props }: SchedulerCardProps) {
  return (
    <Card className={cn('w-auto h-auto', className)} {...props}>
      <CardHeader className='py-4'>
        <CardTitle className='flex justify-between gap-4'>
          <span>{scheduler.dayOfWeek}</span>
          <div className='text-center'>
            <span className='block text-sm text-gray-500'>{scheduler.teacher}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='py-4 space-y-7'>
        {scheduler.items.map((item, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium leading-none'>{item.subject}</span>
              <span className='w-full text-sm text-end font-medium leading-none'>{item.room}</span>
            </div>
            <span className='text-xs text-gray-500'>Преподаватель: {item.teacherName}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
