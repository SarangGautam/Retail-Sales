const BASE_URL = "https://retail-sales-two.vercel.app";

// Build query string
const buildQuery = (params) => {
  const qs = new URLSearchParams();

  if (params.searchTerm) qs.set("searchTerm", params.searchTerm);
  if (params.sortBy) qs.set("sortBy", params.sortBy);
  if (params.sortOrder) qs.set("sortOrder", params.sortOrder);
  if (params.page) qs.set("page", params.page);
  if (params.pageSize) qs.set("pageSize", params.pageSize);

  if (params.filters && Object.keys(params.filters).length > 0) {
    qs.set("filters", JSON.stringify(params.filters));
  }

  return qs.toString();
};

// Fetch paginated sales
export const fetchSales = async (params) => {
  const query = buildQuery(params);

  const res = await fetch(`${BASE_URL}/api/sales?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch sales data");
  }

  return res.json();
};

// Fetch filter options
export const fetchFilterOptions = async () => {
  const res = await fetch(`${BASE_URL}/api/sales/filter-options`);

  if (!res.ok) {
    throw new Error("Failed to fetch filter options");
  }

  return res.json();
};
