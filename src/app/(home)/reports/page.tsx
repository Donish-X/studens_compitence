'use client';

import { useRef } from 'react';
import { Certificate } from './components/certificate';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Импортируем useRouter для роутинга

export default function Page() {
  const certificateRef = useRef(null);
  const router = useRouter(); // Инициализация useRouter

  // Функция для скачивания сертификата
  const handleDownload = () => {
    const element = certificateRef.current;

    // Настройки для html2pdf.js
    const options = {
      filename: 'certificate.pdf', // Имя файла
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: 'mm',
        format: [297, 199], // Альбомный формат A4 (ширина 297 мм, высота 210 мм)
        orientation: 'landscape', // Альбомный формат
      },
    };

    html2pdf().from(element).set(options).save(); // Конвертировать и скачать PDF
  };

  // Функция для перехода на страницу теста
  const handleRedirect = () => {
    router.push('/competencies'); // Указываем путь страницы теста
  };

  return (
    <div className='pb-10 h-full w-full flex flex-col justify-center items-center gap-10'>
      <div ref={certificateRef}>
        <Certificate />
      </div>
      {/* Кнопка "Пройти тест" */}
      <p>Чтобы получить сертификат нужно пройти тест!!!</p>
      <Button onClick={handleRedirect} className='bg-green-600'>
        Пройти тест
      </Button>
    </div>
  );
}
