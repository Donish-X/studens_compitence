import { cn } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

type CardProps = React.ComponentProps<typeof Card>

interface Scheduler {
    dayOfWeek: string,
    items: {
        subject: string,
        room: number,
    }[],
}

type SchedulerCardProps = CardProps & {
    scheduler: Scheduler;
    date: string,
};

export function SchedulerCard({ scheduler, date, className, ...props }: SchedulerCardProps) {
    return (
        <Card className={cn("w-64 h-min", className)} {...props}>
            <CardHeader className="py-4">
                <CardTitle className="flex justify-between gap-4 whitespace-nowrap">
                    <span>
                        {scheduler.dayOfWeek}
                    </span>
                    <span>
                        {date}
                    </span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 space-y-7">
                {/* <div className="space-y-4"> */}
                {scheduler.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-start last:mb-0 last:pb-0"
                    >
                        <span className="min-h-2 min-w-2 translate-y-1 rounded-full bg-sky-500" />
                        <span className="text-sm font-medium leading-none">{item.subject}</span>
                        <span className="w-full text-sm text-end font-medium leading-none">{item.room}</span>
                    </div>
                ))}
                {/* </div> */}
            </CardContent>
        </Card>
    )
}
