import { useEffect, useState } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api';

// Debounce Hook
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export const useSalesData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Debounced search value
  const debouncedSearch = useDebounce(searchTerm, 400);

  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load filter options once
  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch((err) => console.error(err));
  }, []);

  // Search whenever user stops typing
  useEffect(() => {
    if (debouncedSearch.length > 0 && debouncedSearch.length < 3) return;

    setLoading(true);
    setError('');

    fetchSales({
      searchTerm: debouncedSearch,
      filters,
      sortBy,
      sortOrder,
      page,
      pageSize
    })
      .then((res) => {
        setSales(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, filters, sortBy, sortOrder, page, pageSize]);

  return {
    searchTerm,
    filters,
    sortBy,
    sortOrder,
    page,
    pageSize,
    sales,
    pagination,
    filterOptions,
    loading,
    error,

    // Setters
    setSearchTerm,
    setFilters,
    setSortBy,
    setSortOrder,
    setPage
  };
};
