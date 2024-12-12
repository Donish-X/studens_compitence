'use client';

import { createContext, useEffect, useState } from 'react';
import { DataTable } from './components/data-table';
import { repository } from '@/lib/api';

export const JournalContext = createContext({
  data: [],
  setData: () => {},
});

export default function Journal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [data, setData] = useState([]); // Добавлено состояние для данных журнала

  const useRepository = repository();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useRepository.getJournal(); // Получение данных журнала
        console.log('Fetched Data:', response); // Для отладки
        setData(response); // Обновление состояния data
      } catch (error) {
        console.error('Ошибка при получении данных журнала:', error);
        alert('Ошибка при получении данных журнала.');
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (student) => {
    console.log('Selected Student:', student); // Для отладки

    try {
      const response = await useRepository.getStudentData(student.id);
      const gpa = response.reduce((sum, subject) => sum + subject.value, 0) / 10;
      const subjectsInfo = response
        .map((subject) => `${subject.subject_name}: ${subject.value}`)
        .join('\n');

      setStudentData({
        name: student.student_name, // Проверяем, что name есть в student
        gpa: gpa.toFixed(2),
        subjectsInfo,
      });
      setIsModalVisible(true);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      alert('Ошибка при получении данных студента.');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setStudentData(null);
  };

  return (
    <div className='px-10 mx-auto'>
      <DataTable data={data} onRowClick={handleRowClick} /> {/* Теперь data передается в таблицу */}
      {isModalVisible && studentData && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg relative overflow-hidden w-[80%] max-w-[1000px]'>
            <button
              className='absolute top-4 right-4 text-2xl font-bold text-gray-500'
              onClick={closeModal}
            >
              X
            </button>
            <div className='text-center overflow-y-auto' style={{ maxHeight: 'calc(70vh - 80px)' }}>
              <h2 className='text-xl font-bold mb-4'>Информация о студенте</h2>
              <p>Имя: {studentData.name}</p> {/* Имя студента отображается здесь */}
              <p>GPA: {studentData.gpa}</p>
              <h3 className='mt-4'>Предметы:</h3>
              <pre>{studentData.subjectsInfo}</pre>
            </div>

            <div className='mt-8 flex justify-between'>
              <button onClick={closeModal} className='bg-gray-500 text-white px-6 py-2 rounded-lg'>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
