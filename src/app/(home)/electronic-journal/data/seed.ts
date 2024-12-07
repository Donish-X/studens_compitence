import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

export function generate() {
  const tasks = Array.from({ length: 100 }, () => {
    const first = faker.number.int({ min: 3, max: 5 });
    const second = faker.number.int({ min: 3, max: 5 });
    const third = faker.number.int({ min: 3, max: 5 });
    const fourth = faker.number.int({ min: 3, max: 5 });

    return {
      name: faker.person.fullName(),
      first: first,
      second: second,
      third: third,
      fourty: fourth,
      annual: Math.round((first + second + third + fourth) / 4),
    };
  });

  fs.writeFileSync(
    path.join("./src/app/(home)/electronic-journal/data/", "journal.json"),
    JSON.stringify(tasks, null, 2)
  );

  console.log("✅ Tasks data generated.");
}
