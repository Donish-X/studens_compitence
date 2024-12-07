import { SubjectCard } from "./components/subject-card";

const subjects = [
    {
        name: 'Алгебра',
        src: '/img/algebra.jpg',
    },
    {
        name: 'Геометрия',
        src: '/img/geometry.jpg',
    },
    {
        name: 'Химия',
        src: '/img/chemistry.jpg',
    },
    {
        name: 'Английский',
        src: '/img/english.jpg',
    },
    {
        name: 'История',
        src: '/img/history.png',
    },
    {
        name: 'Литература',
        src: '/img/literature.jpg',
    },
    {
        name: 'Физика',
        src: '/img/physics.jpg',
    },
    {
        name: 'Узбекский язык',
        src: '/img/uzb-lang.png',
    },
    {
        name: 'Русский язык',
        src: '/img/ru-lang.webp',
    },
];

export default function Page() {
    return (
        <div className="px-10 pb-10 h-full w-full grid items-center grid-cols-3 gap-10 overflow-y-scroll">
            {/* <h1>Предметы</h1> */}
            {subjects.map((subject) => {
                return <SubjectCard key={subject.src} data={subject} />;
            })}
        </div>
    );
}