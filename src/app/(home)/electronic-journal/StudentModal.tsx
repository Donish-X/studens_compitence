import React from 'react';

interface StudentData {
  name: string;
  gpa: string;
  subjectsInfo: string;
}

interface StudentModalProps {
  studentData: StudentData;
  closeModal: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ studentData, closeModal }) => {
  return (
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
          <p>Имя: {studentData.name}</p>
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
  );
};

export default StudentModal;
