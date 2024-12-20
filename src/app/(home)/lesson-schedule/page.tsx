// 'use client'

// import { Subject } from "@/lib/type";
import { SchedulerCard } from './schedule-card';
// import { repository } from "@/lib/api";
// import { useEffect, useState } from "react";

const schedulers = [
  {
    dayOfWeek: 'Понедельник',
    items: [
      {
        subject: 'Алгебра',
        teacherName: 'Исмаилов Жамшид',
        room: 200,
      },
      {
        subject: 'Геометрия',
        teacherName: 'Исмаилов Жамшид',
        room: 201,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Русский',
        teacherName: 'Карен Акопян',
        room: 203,
      },
      {
        subject: 'Физика',
        teacherName: 'Дилбар Рустамовна',
        room: 204,
      },
    ],
  },
  {
    dayOfWeek: 'Вторник',
    items: [
      {
        subject: 'Алгебра',
        teacherName: 'Исмаилов Жамшид',
        room: 200,
      },
      {
        subject: 'Геометрия',
        teacherName: 'Исмаилов Жамшид',
        room: 201,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'История',
        teacherName: 'Виктор Цой',
        room: 205,
      },
      {
        subject: 'Узбекиский',
        teacherName: 'Малика Рустамова',
        room: 206,
      },
    ],
  },
  {
    dayOfWeek: 'Среда',
    items: [
      {
        subject: 'Алгебра',
        teacherName: 'Исмаилов Жамшид',
        room: 200,
      },
      {
        subject: 'Геометрия',
        teacherName: 'Исмаилов Жамшид',
        room: 201,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Химия',
        teacherName: 'Рахмм Аша',
        room: 206,
      },
      {
        subject: 'Литература',
        teacherName: 'Карен Акопян',
        room: 207,
      },
    ],
  },
  {
    dayOfWeek: 'Четверг',
    items: [
      {
        subject: 'Алгебра',
        teacherName: 'Исмаилов Жамшид',
        room: 200,
      },
      {
        subject: 'Геометрия',
        teacherName: 'Исмаилов Жамшид',
        room: 201,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'ОБЖ',
        teacherName: 'Рахмонов Далер',
        room: 206,
      },
      {
        subject: 'История',
        teacherName: 'Виктор Цой',
        room: 205,
      },
    ],
  },
  {
    dayOfWeek: 'Пятница',
    items: [
      {
        subject: 'Алгебра',
        teacherName: 'Исмаилов Жамшид',
        room: 200,
      },
      {
        subject: 'Геометрия',
        teacherName: 'Исмаилов Жамшид',
        room: 201,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Английский',
        teacherName: 'Beth Harmon',
        room: 202,
      },
      {
        subject: 'Русский',
        teacherName: 'Карен Акопян',
        room: 203,
      },
      {
        subject: 'Литература',
        teacherName: 'Карен Акопян',
        room: 207,
      },
    ],
  },
];

export default function Page() {
  return (
    <div className='px-10 pt-4 h-full w-full'>
      <div className='2xl:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 grid gap-y-20'>
        {schedulers.map((scheduler) => {
          return (
            <SchedulerCard
              className='justify-self-center self-center'
              key={scheduler.dayOfWeek}
              scheduler={scheduler}
            />
          );
        })}
      </div>
    </div>
  );
}
