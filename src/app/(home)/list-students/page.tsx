'use client';

import { useEffect, useState } from 'react';
import { repository } from '@/lib/api'; // Импортировать repository, где находится getStudents
import { DataTable } from './components/data-table'; // Ваш компонент таблицы

export default function Page() {
  const [data, setData] = useState<any[]>([]); // Состояние для хранения данных
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок

  useEffect(() => {
    // Функция для получения данных с API
    const fetchData = async () => {
      try {
        // Используем метод getStudents из repository для получения студентов
        const students = await repository().getStudents();

        // Обработка данных, извлекаем нужные поля
        const formattedStudents = students.map((student: any) => ({
          full_name: student.full_name, // Извлекаем full_name
          group_name: student.group_name, // Извлекаем group_name
        }));

        setData(formattedStudents); // Устанавливаем данные в состояние
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false); // После загрузки отключаем индикатор загрузки
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз при монтировании компонента

  if (loading) {
    return <div>Загрузка...</div>; // Показать индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Показать ошибку, если она есть
  }

  if (data.length === 0) {
    return <div>Нет данных для отображения.</div>; // Сообщение, если данных нет
  }

  return (
    <div className='container px-10 pt-10'>
      <DataTable data={data} /> {/* Передаем данные в таблицу */}
    </div>
  );
}
