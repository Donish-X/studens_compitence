import { ColumnDef } from "@tanstack/react-table"

export type Journal = {
    id: number
    student_name: string
    values: {
        id: number
        value: number
    }[]
}

export const columns: ColumnDef<Journal>[] = [
    {
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
        accessorKey: "student_name",
        header: () => {
            return (
                <div className="text-center">Ученики</div>
            );
        },
        cell: ({ row }) => {
            // console.info('student name: ', row.getValue("student_name"))
            return (
                <div className="pl-4 text-start">{row.getValue("student_name")}</div>
            );
        },
    },
    {
        accessorKey: "i",
        header: () => {
            return (
                <div className="text-center">I</div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">{row.original.values[0].value}</div>
            )
        },
    },
    {
        accessorKey: "values",
        header: () => {
            return (
                <div className="text-center">II</div>
            );
        },
        cell: ({ row }) => {
            const rowData = row.getValue<{ id: number, value: number }[]>("values")[1];

            if (rowData) {
                return (
                    <div className="text-center">{rowData.value}</div>
                )
            }
        },
    },
    {
        accessorKey: "iii",
        header: () => {
            return (
                <div className="text-center">III</div>
            );
        },
        cell: ({ row }) => {
            const rowData = row.getValue<{ id: number, value: number }[]>("values")[2];

            if (rowData) {
                return (
                    <div className="text-center">{rowData.value}</div>
                )
            }
        },
    },
    {
        accessorKey: "iv",
        header: () => {
            return (
                <div className="text-center">IV</div>
            );
        },
        cell: ({ row }) => {
            const rowData = row.getValue<{ id: number, value: number }[]>("values")[3];

            if (rowData) {
                return (
                    <div className="text-center">{rowData.value}</div>
                )
            }
        },
    },
    {
        accessorKey: "annual",
        header: () => {
            return (
                <div className="text-center">Годовая</div>
            );
        },
        cell: ({ row }) => {
            let rowData = 0;
            if (row.original.values.length === 4) {
                row.original.values.map((data) => {
                    rowData += data.value;
                });

                rowData /= 4;
            }
            return (
                <div className="text-center">{rowData}</div>
            );
        },
    },
]