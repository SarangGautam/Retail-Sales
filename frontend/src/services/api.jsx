const buildQuery = (params) => {
  const searchParams = new URLSearchParams();

  if (params.searchTerm) searchParams.set('searchTerm', params.searchTerm);
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  if (params.page) searchParams.set('page', String(params.page));
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));

  if (params.filters && Object.keys(params.filters).length > 0) {
    searchParams.set('filters', JSON.stringify(params.filters));
  }

  return searchParams.toString();
};

export const fetchSales = async (params) => {
  const query = buildQuery(params);
  const res = await fetch(`/api/sales?${query}`);
  if (!res.ok) throw new Error('Failed to fetch sales');
  return res.json();
};

export const fetchFilterOptions = async () => {
  const res = await fetch('/api/sales/filter-options');
  if (!res.ok) throw new Error('Failed to fetch filter options');
  return res.json();
};
