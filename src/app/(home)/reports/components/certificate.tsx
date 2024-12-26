'use client';
import localFont from 'next/font/local';
import Image from 'next/image';

const lobsterFont = localFont({ src: '../../../fonts/Lobster/Lobster-Regular.ttf' });

export const Certificate = ({
  studentName,
  studentGroup,
  createdAt,
  cl,
}: {
  studentName: string;
  studentGroup: string;
  createdAt: string;
  cl: string;
}) => {
  const getRecommendationText = () => {
    switch (cl) {
      case 0:
        return `Рекомендуется обратить внимание на развитие базовых навыков в естественных науках и информационных технологиях.`;
      case 1:
        return `Рекомендации На основании проведенного анализа ${studentName} предпочтительные для обучения в профильных образовательных программах по направлениям:

        Естественные науки (химия, биология, экология).
        Инженерно-техническая специальность.
        Физика и прикладная математика.
        Информационные технологии и научные исследования.`;
      case 2:
        return `${studentName} обладает высоким уровнем компетентности в гуманитарной сфере, что подтверждает его готовность к постоянному обучению по профильным образовательным программам.`;
      default:
        return `Не удалось определить предпочтительные направления.`;
    }
  };

  return (
    <div className='relative w-[73rem] h-[47rem] flex justify-center bg-white'>
      {/* Синий фон */}
      <div className='absolute left-0 top-0 w-[30rem] h-full z-0'>
        <Image
          src='/svg/left-pattern.svg'
          alt='background pattern'
          layout='fill'
          objectFit='cover'
        />
      </div>

      {/* Токен */}
      <Image
        src='/svg/token.svg'
        alt='token'
        width={210}
        height={208}
        className='absolute left-32 top-12 z-10'
      />

      {/* Дата */}
      <span className='absolute top-40 left-52 text-xl font-bold text-green-950 z-20'>
        {new Date(createdAt).toLocaleDateString('ru-RU', { year: 'numeric' })}
      </span>

      <div className='h-full pl-80 pr-20 pt-10 flex flex-col items-end z-20'>
        <div className='w-[37rem] space-y-4 text-end text-black'>
          <h1 className='text-5xl font-bold'>СЕРТИФИКАТ</h1>
          <h2 className='text-2xl font-medium uppercase'>определения компетентности ученика</h2>
          <div className='w-full h-1 bg-[#E09C3A]'></div>
        </div>
        <div className='text-end'>
          <h4 className='font-semibold text-black'>Класс: {studentGroup}</h4>
          <div className='py-14 space-y-7 text-start'>
            <h2 className={lobsterFont.className + ' text-5xl text-end text-[#BE9A45]'}>
              {studentName}
            </h2>
            <p className='text-black'>{getRecommendationText()}</p>
          </div>
        </div>

        <div className='pt-5 w-full flex justify-between items-center'>
          <div className='pl-20 flex flex-col gap-1 text-center text-black'>
            <span className='text-2xl'>{new Date(createdAt).toLocaleDateString('ru-RU')}</span>
            <span className='h-0.5 w-40 bg-black'></span>
            <span className='text-3xl'>DATE</span>
          </div>

          <div className='relative flex flex-col gap-1 text-center text-black'>
            <div className='flex justify-center items-center'>
              <Image
                src='/svg/signature.svg'
                alt='signature'
                width={128}
                height={128}
                className='z-10'
              />
            </div>
            <span className='mt-9 h-0.5 w-52 bg-black'></span>
            <span className='text-3xl'>SIGNATURE</span>
          </div>
        </div>
      </div>

      <span className='h-full w-10 bg-[#175ADC]'></span>
    </div>
  );
};
