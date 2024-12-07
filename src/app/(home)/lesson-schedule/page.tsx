// 'use client'

// import { Subject } from "@/lib/type";
import { SchedulerCard } from "./schedule-card";
// import { repository } from "@/lib/api";
// import { useEffect, useState } from "react";

const schedulers = [
    {
        dayOfWeek: 'Понедельник',
        items: [
            {
                subject: 'Алгебра',
                room: 200,
            },
            {
                subject: 'Геометрия',
                room: 201,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Русский',
                room: 203,
            },
            {
                subject: 'Физика',
                room: 204,
            },
        ]
    },
    {
        dayOfWeek: 'Вторник',
        items: [
            {
                subject: 'Алгебра',
                room: 200,
            },
            {
                subject: 'Геометрия',
                room: 201,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'История',
                room: 205,
            },
            {
                subject: 'Узбекиский',
                room: 206,
            },
        ]
    },
    {
        dayOfWeek: 'Среда',
        items: [
            {
                subject: 'Алгебра',
                room: 200,
            },
            {
                subject: 'Геометрия',
                room: 201,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Химия',
                room: 206,
            },
            {
                subject: 'Литература',
                room: 207,
            },
        ]
    },
    {
        dayOfWeek: 'Четверг',
        items: [
            {
                subject: 'Алгебра',
                room: 200,
            },
            {
                subject: 'Геометрия',
                room: 201,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'ОБЖ',
                room: 206,
            },
            {
                subject: 'История',
                room: 205,
            },
        ]
    },
    {
        dayOfWeek: 'Пятница',
        items: [
            {
                subject: 'Алгебра',
                room: 200,
            },
            {
                subject: 'Геометрия',
                room: 201,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Английский',
                room: 202,
            },
            {
                subject: 'Русский',
                room: 203,
            },
            {
                subject: 'Литература',
                room: 207,
            },
        ]
    }
];

export default function Page() {
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short'
    };

    // const [subjects, setSubjects] = useState<Subject[]>([]);
    // const [schedulers, setSchedulers] = useState<{}>();

    // const useRepository = repository();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await useRepository.getSubjects();
    //             setSubjects(response);
    //         } catch (error) {
    //             console.error('Error fetching subjects', error);
    //         }
    //     };
    //     fetchData();
    //     console.info('blet');
    // }, []);

    return (
        <div className="px-10 pt-4 h-full w-full">
            <div className="2xl:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 grid gap-y-20">
                {schedulers.map((scheduler, index) => {
                    return <SchedulerCard
                        className="justify-self-center self-center"
                        key={scheduler.dayOfWeek}
                        scheduler={scheduler}
                        date={new Intl.DateTimeFormat('ru-RU', dateOptions).format(new Date(Date.now() + index * 86400000))}
                    />;
                })}
            </div>
        </div>
    );
}