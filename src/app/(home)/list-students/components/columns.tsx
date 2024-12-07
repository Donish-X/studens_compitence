import { ColumnDef } from "@tanstack/react-table"
import { ListOfStudents } from "../data/data";

export const columns: ColumnDef<ListOfStudents>[] = [
    {
        id: 'select',
        accessorKey: "index",
        header: () => {
            return (
                <div className="text-center">
                    {"№"}
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.index + 1}
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: () => {
            return (
                <div className="text-center">Студенты</div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-start">{row.getValue("name")}</div>
            );
        },
    },
    {
        accessorKey: "class",
        header: () => {
            return (
                <div className="text-center">Класс</div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">{row.getValue("class") + ' класс'}</div>
            );
        },
    },
]