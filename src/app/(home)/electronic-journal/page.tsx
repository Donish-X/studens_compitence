'use client';

import { createContext, useEffect, useState } from 'react';
import { DataTable } from './components/data-table';
import { repository } from '@/lib/api';
import { JournalContextType, JournalEntry } from './interface/interfaces';
import StudentModal from './StudentModal'; // Импортируем новый компонент

export const JournalContext = createContext<JournalContextType>({
  data: [],
  setData: () => { },
});

interface Student {
  id: string;
  student_name: string;
}

export default function Journal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [data, setData] = useState<JournalEntry[]>([]);

  const useRepository = repository();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useRepository.getJournal();
        console.log('Fetched Data:', response);
        setData(response);
      } catch (error) {
        console.error('Ошибка при получении данных журнала:', error);
        alert('Ошибка при получении данных журнала.');
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (student: Student) => {
    try {
      const response = await useRepository.getStudentData(student.id);

      if (!Array.isArray(response)) {
        throw new Error('Unexpected data format');
      }

      const gpa = response.reduce((sum, subject) => sum + subject.value, 0) / response.length;
      const gpaString = gpa.toFixed(2);

      const subjectsInfo = response
        .map((subject) => `${subject.subject_name}: ${subject.value}`)
        .join('\n');

      setStudentData({
        name: student.student_name,
        gpa: gpaString,
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
    <JournalContext.Provider value={{ data, setData }}>
      <div className='px-10 mx-auto'>
        <DataTable data={data} onRowClick={handleRowClick} />
        {isModalVisible && studentData && (
          <StudentModal studentData={studentData} closeModal={closeModal} />
        )}
      </div>
    </JournalContext.Provider>
  );
}
