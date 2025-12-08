import { IndexRecord } from "./types";

export const searchIndex = (index: IndexRecord[], q: string): IndexRecord[] => {
  if (!q || q.trim().length < 3) return [];

  q = q.toLowerCase();

  return index.filter(rec =>
    rec.name.includes(q) ||
    rec.phone.includes(q)
  );
};
