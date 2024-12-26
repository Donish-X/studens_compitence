import { FC } from 'react';
import Image from 'next/image';

interface SubjectCardProps {
  data: {
    name: string;
    src: string;
  };
}

export const SubjectCard: FC<SubjectCardProps> = ({ data }) => {
  return (
    <div className='border rounded-lg overflow-hidden'>
      <div className='relative h-[25rem] w-full'>
        <Image
          src={data.src}
          alt={data.name}
          layout='fill'
          objectFit='cover'
          quality={90} // Опционально, чтобы задать качество изображения
        />
      </div>
      <div className='px-8 py-4'>
        <span className='text-lg font-semibold'>{data.name}</span>
      </div>
    </div>
  );
};
