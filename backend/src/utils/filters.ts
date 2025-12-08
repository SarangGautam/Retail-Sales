export const applyFilters = (records: any[], filters: any) => {
  if (!filters) return records;

  return records.filter(r => {
    if (filters.region && !filters.region.includes(r["Customer Region"])) return false;
    if (filters.gender && !filters.gender.includes(r["Gender"])) return false;
    return true;
  });
};
