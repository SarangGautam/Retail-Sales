import fs from "fs";
import { parse } from "fast-csv";
import { IndexRecord } from "./types";

const DATA_PATH = "./data/sales.csv";

let index: IndexRecord[] = [];
let rowOffsets: number[] = [];

export const loadCSV = async () => {
  return new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(DATA_PATH);
    let rowNumber = 0;

    stream
      .pipe(parse({ headers: true }))
      .on("data", (row: any) => {
        rowOffsets[rowNumber] = stream.bytesRead;

        index.push({
          id: rowNumber,
          name: row["Customer Name"].toLowerCase(),
          phone: row["Phone Number"],
          date: new Date(row["Date"]).getTime(),
          qty: Number(row["Quantity"])
        });

        rowNumber++;
      })
      .on("end", resolve)
      .on("error", reject);
  });
};

export const getIndex = () => index;

export const readRowById = async (id: number): Promise<any> => {
  return new Promise((resolve) => {
    let counter = 0;

    fs.createReadStream(DATA_PATH)
      .pipe(parse({ headers: true }))
      .on("data", (row) => {
        if (counter === id) resolve(row);
        counter++;
      });
  });
};
