export const paginate = (records: any[], page: number, pageSize: number) => {
  const total = records.length;
  const start = (page - 1) * pageSize;

  return {
    data: records.slice(start, start + pageSize),
    total,
    totalPages: Math.ceil(total / pageSize)
  };
};
