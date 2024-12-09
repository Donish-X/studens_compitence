import { ColumnDef } from '@tanstack/react-table';
import { ListOfStudents } from '../data/data';

export const columns: ColumnDef<ListOfStudents>[] = [
  {
    id: 'select',
    accessorKey: 'index',
    header: () => {
      return <div className='text-center'>№</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='text-center'>
          {row.id} {/* Используем row.id для индекса строки */}
        </div>
      );
    },
  },
  {
    accessorKey: 'full_name',
    header: () => {
      return <div className='text-center'>Студенты</div>;
    },
    cell: ({ row }) => {
      return <div className='text-start'>{row.getValue('full_name')}</div>;
    },
  },
  {
    accessorKey: 'group_name',
    header: () => {
      return <div className='text-center'>Класс</div>;
    },
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('group_name') + ' класс'}</div>;
    },
  },
];
