export interface JournalEntry {
  id: string; // Идентификатор записи
  student_name: string; // Имя студента
  subject_name: string; // Название предмета
  gpa: string; // GPA как число для вычислений
}

// Контекст данных журнала
export interface JournalContextType {
  data: JournalEntry[]; // Массив записей журнала
  setData: (data: JournalEntry[]) => void; // Функция для обновления записей
}
