import { FC } from "react";

interface SubjectCardProps {
    data: {
        name: string,
        src: string,
    }
}

export const SubjectCard: FC<SubjectCardProps> = ({ data }) => {
    return (
        <div className="border rounded-lg overflow-hidden">
            <img src={data.src} alt={data.name} className="h-[25rem] w-full object-cover" />
            <div className="px-8 py-4">
                <span className="text-lg font-semibold">{data.name}</span>
            </div>
        </div>
    );
}