'use client';

import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';
import { useRef, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { repository } from '@/lib/api';
import { Question } from '@/lib/type';
import axios from 'axios';
import { Certificate } from '../reports/components/certificate'; // Импортируем Certificate
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Dynamically import html2pdf to avoid server-side issues
// import dynamic from 'next/dynamic';
// const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white w-[72rem] h-[47rem] p-4 rounded-lg overflow-auto relative'>
        <button
          className='absolute top-4 right-4 text-xl font-bold text-gray-500'
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [cl, setCl] = useState<number | null>(null); // Состояние для cl
  const [modalVisible, setModalVisible] = useState(false); // Состояние для модального окна
  const [certificateData, setCertificateData] = useState<{
    studentName: string;
    studentGroup: string;
    createdAt: string;
    cl: number;
  } | null>(null); // Состояние для данных сертификата

  const useRepository = repository();

  useEffect(() => {
    async function fetchQuestions() {
      const response = await useRepository.getQuestions();
      setQuestions(response);
    }

    async function fetchStudentId() {
      const response = await useRepository.getUser();
      const response = await useRepository.getUser();
      setStudentId(response.student);
    }

    fetchQuestions();
    fetchStudentId();
  }, []); // Добавляем useRepository

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const numericAnswers = Object.entries(answers).reduce((acc, [key, value]) => {
      acc[Number(key)] = value === 'yes' ? 1 : 0;
      return acc;
    }, {} as Record<number, number>);

    const first10Sum = Array.from({ length: 10 }, (_, i) => numericAnswers[i + 1] || 0).reduce(
      (sum, value) => sum + value,
      0,
    );
    const second10Sum = Array.from({ length: 10 }, (_, i) => numericAnswers[i + 11] || 0).reduce(
      (sum, value) => sum + value,
      0,
    );

    const y1 = first10Sum / 10;
    const y2 = second10Sum / 10;

    console.log('Тело запроса:', { y1, y2, student: studentId });

    try {
      const response = await useRepository.submitResults({
        y1,
        y2,
        student: studentId,
      });

      console.log('Данные успешно отправлены:', response);
      setCl(response.cl);
      setModalVisible(true);

      // Передаем response в состояние
      setCertificateData({
        studentName: response.student_name,
        studentGroup: response.student_group,
        createdAt: response.created_at,
        cl: response.cl,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка от сервера:', error.response?.data || error.message);
        alert(`Ошибка: ${error.response?.data?.detail || 'Произошла ошибка'}`);
      } else {
        console.error('Неизвестная ошибка:', error);
        alert('Неизвестная ошибка. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  const certificateRef = useRef(null);
  const handleDownload = async () => {
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

    if (element) {
      const canvas = await html2canvas(element, options.html2canvas);
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF(options.jsPDF.orientation, options.jsPDF.unit, options.jsPDF.format);
      pdf.addImage(imgData, 'JPEG', 0, 0, options.jsPDF.format[0], options.jsPDF.format[1]);
      pdf.save(options.filename);
    }
  };

  const allAnswered = questions.every((question) => answers[question.id] !== undefined);

  if (questions.length === 0) {
    return <div>Загрузка вопросов...</div>;
  }

  return (
    <div className='px-20 h-full w-full flex flex-col gap-4'>
      <h3 className='text-xl font-semibold mb-6'>Ответьте на вопросы</h3>
      {questions.map((question, index) => (
        <div
          key={question.id}
          className='bg-gray-50 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow'
        >
          <h4 className='text-lg font-medium text-gray-800'>
            {index + 1}. {question.text}
          </h4>
          <RadioGroup
            className='flex flex-col space-y-3 mt-4'
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='yes' id={`yes-${question.id}`} />
              <Label htmlFor={`yes-${question.id}`} className='text-sm'>
                Да
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='no' id={`no-${question.id}`} />
              <Label htmlFor={`no-${question.id}`} className='text-sm'>
                Нет
              </Label>
            </div>
          </RadioGroup>
        </div>
      ))}
      {allAnswered && (
        <Button
          onClick={handleSubmit}
          className='bg-blue-600 text-white px-6 py-2 mt-6 rounded-lg transition-all hover:bg-blue-700'
        >
          Подтвердить ответы
        </Button>
      )}

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className='bg-white w-[90rem] max-w-full min-h-[70vh] p-6 rounded-lg relative overflow-hidden'>
          <button
            className='absolute top-4 right-4 text-xl font-bold text-gray-500'
            onClick={() => setModalVisible(false)}
          >
            X
          </button>
          <div
            className='text-center overflow-y-auto'
            style={{ maxHeight: 'calc(70vh - 80px)' }}
            ref={certificateRef}
          >
            {certificateData ? (
              <Certificate
                studentName={certificateData.studentName}
                studentGroup={certificateData.studentGroup}
                createdAt={certificateData.createdAt}
                cl={certificateData.cl}
              />
            ) : (
              <div>Загрузка...</div>
            )}
          </div>

          <div className='mt-8 flex justify-between'>
            <Button
              onClick={handleDownload}
              className='bg-blue-600 text-white px-6 py-2 rounded-lg'
            >
              Скачать
            </Button>

            <Button
              onClick={() => setModalVisible(false)}
              className='bg-gray-500 text-white px-6 py-2 rounded-lg'
            >
              Закрыть
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
