export const sortRecords = (records: any[], sortBy: string, order: "asc"|"desc") => {
  const dir = order === "asc" ? 1 : -1;

  return records.sort((a, b) => {
    if (sortBy === "date") return (new Date(a.Date).getTime() - new Date(b.Date).getTime()) * dir;
    if (sortBy === "quantity") return (a.Quantity - b.Quantity) * dir;
    return a["Customer Name"].localeCompare(b["Customer Name"]) * dir;
  });
};
