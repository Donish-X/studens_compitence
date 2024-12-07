'use client';

import { createContext, useEffect, useState } from "react";
// import { promises as fs } from "fs"
// import path from "path"
import { DataTable } from "./components/data-table";
import { repository } from "@/lib/api";
// import { useEffect } from "react";
// import { generate } from "./data/seed";


// async function getData() {
//     const data = await fs.readFile(
//         path.join(process.cwd(), "/src/app/(home)/electronic-journal/data/journal.json")
//     )

//     const tasks = JSON.parse(data.toString())

//     return tasks;
// }


export const JournalContext = createContext<{
    data: never[],
    setData: (data: []) => void,
}>({
    data: [],
    setData: () => { }
});

export default function Journal() {
    // generate();
    const [data, setData] = useState([]);
    const useRepository = repository();

    useEffect(() => {
        const fetchData = async () => {
            const response = await useRepository.getJournal();
            setData(response);
        }
        fetchData();
    }, []);

    // const data = await getData();

    return (
        <div className="px-10 mx-auto">
            <JournalContext.Provider value={{
                data,
                setData,
            }}>
                <DataTable data={data} />
            </JournalContext.Provider>
        </div>
    )
}
