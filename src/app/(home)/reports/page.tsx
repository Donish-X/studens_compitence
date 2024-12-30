'use client';

import { useEffect, useRef, useState } from 'react';
import { Certificate } from './components/certificate';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { repository } from '@/lib/api'; // Импорт вашего репозитория
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Page() {
  const certificateRef = useRef(null);
  const router = useRouter();
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      const repo = repository();
      try {
        const data = await repo.getLastCertificate(); // Укажите правильный studentId
        // Проверяем, если сервер не возвращает обязательные данные
        if (data && data.student_name && data.student_group && data.created_at && data.cl) {
          setCertificateData(data);
        } else {
          setCertificateData(null);
        }
      } catch (error) {
        console.error('Ошибка при получении данных сертификата:', error);
        setCertificateData(null);
      }
    };

    fetchCertificateData();
  }, []);

  const handleDownload = async () => {
    const element = certificateRef.current;

    const options = {
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // Включаем логирование для диагностики
        allowTaint: true, // Разрешаем утечку (если изображения на другом домене)
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // Включаем логирование для диагностики
        allowTaint: true, // Разрешаем утечку (если изображения на другом домене)
      },
      jsPDF: {
        unit: 'mm',
        format: [297, 199],
        orientation: 'landscape',
      },
    };

    if (element) {
      const canvas = await html2canvas(element, options.html2canvas);
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF(options.jsPDF.orientation, options.jsPDF.unit, options.jsPDF.format);
      pdf.addImage(imgData, 'JPEG', 0, 0, options.jsPDF.format[0], options.jsPDF.format[1]);
      pdf.save(options.filename);
    }
  };

  const handleRedirect = () => {
    router.push('/competencies');
  };

  return (
    <div className='pb-10 h-full w-full flex flex-col justify-center items-center gap-10'>
      {certificateData ? (
        <>
          <div ref={certificateRef}>
            <Certificate
              studentName={certificateData.student_name}
              studentGroup={certificateData.student_group}
              createdAt={certificateData.created_at}
              cl={certificateData.cl}
            />
          </div>
          <Button onClick={handleDownload} className='bg-blue-600'>
            Скачать сертификат
          </Button>
        </>
      ) : (
        <>
          <p>Чтобы получить сертификат нужно пройти тест!!!</p>
          <Button onClick={handleRedirect} className='bg-green-600'>
            Пройти тест
          </Button>
        </>
      )}
    </div>
  );
}
