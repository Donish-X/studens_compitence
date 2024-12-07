import { promises as fs } from "fs"
import path from "path"
import { DataTable } from "./components/data-table";
// import { generate } from "./data/seed";

async function getData() {
    const data = await fs.readFile(
        path.join(process.cwd(), "/src/app/(home)/list-students/data/list.json")
    )

    const tasks = JSON.parse(data.toString())

    return tasks;
}

export default async function Page() {
    // generate();

    const data = await getData();

    return (
        <div className="container px-10 pt-10">
            <DataTable data={data} />
        </div>
    );
}