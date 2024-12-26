import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { repository } from '@/lib/api';
import { Subject } from '@/lib/type';
import { ChevronDown } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { JournalContext } from '../page';

export const DropdownSubjects = () => {
  const { setData } = useContext(JournalContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  const [selectedOther, setSelectedOther] = useState<string>('Option 1'); // Состояние для второго меню

  const useRepository = repository();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useRepository.getSubjects();
        setSubjects(response);
        setSelectedSubject(response[0]);
      } catch (error) {
        console.error('Error fetching subjects', error);
      }
    };
    fetchData();
  }, []); // Добавили useRepository в зависимости

  async function selectValue(value: string) {
    const selected = subjects.find((subject) => subject.name === value);
    if (selected) {
      try {
        const response = await useRepository.getJournal(selected.id);
        setData(response);
      } catch (error) {
        console.error('Error fetching subjects', error);
      }
      setSelectedSubject(selected);
    }
  }

  const handleSecondDropdownChange = (value: string) => {
    setSelectedOther(value);
    // Здесь можно добавить логику для второго dropdown menu
  };

  return (
    <div className='flex gap-3 pb-3'>
      {/* Используем flexbox для выравнивания слева */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='capitalize'>
            {selectedSubject?.name} <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-56'>
          <DropdownMenuRadioGroup value={selectedSubject?.name} onValueChange={selectValue}>
            {subjects.map((subject) => (
              <DropdownMenuRadioItem key={subject.id} value={subject.name} className='capitalize'>
                {subject.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Второе DropdownMenu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='capitalize'>
            {selectedOther} <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-56'>
          <DropdownMenuRadioGroup value={selectedOther} onValueChange={handleSecondDropdownChange}>
            <DropdownMenuRadioItem value='10 класс' className='capitalize'>
              10 класс
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='11 класс' className='capitalize'>
              11 класс
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
