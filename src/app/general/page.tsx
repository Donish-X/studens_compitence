'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Импорт хука для маршрутизации
import Image from 'next/image'; // Импорт компонента Image для обработки изображений в Next.js

export default function TitlePage() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Устанавливаем таймер на 1 секунду (чтобы завершить анимацию fade-out)
    const timer = setTimeout(() => {
      setIsFading(true);
      // Переходим на другую страницу после завершения анимации
      setTimeout(() => {
        router.push('/login');
      }, 1000); // Задержка для того, чтобы анимация успела закончиться
    }, 1000); // Задержка перед началом анимации

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-black ${
        isFading ? 'fade-out' : ''
      }`}
    >
      {/* Логотип школы */}
      <div className='mb-8'>
        <Image
          src='/redbridge.svg' // Путь к изображению в папке public
          alt='School Logo'
          width={500}
          height={500}
          className='rounded-full'
        />
      </div>

      {/* Подзаголовок или описание */}
      <p className='text-xl font-semibold text-center mt-4 px-8 leading-relaxed text-[#D7B56D]'>
        Добро пожаловать в нашу школу! Мы гордимся нашими достижениями и стремимся к новым вершинам.
      </p>
    </div>
  );
}
