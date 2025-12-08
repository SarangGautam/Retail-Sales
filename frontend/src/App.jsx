import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SalesTable from './components/SalesTable';
import PaginationControls from './components/PaginationControls';
import { useSalesData } from './hooks/useSalesData';
import './styles/main.css'

export default function App() {
  const {
    searchTerm,
    filters,
    sortBy,
    sortOrder,
    page,
    sales,
    pagination,
    filterOptions,
    loading,
    error,
    setSearchTerm,
    setFilters,
    setSortBy,
    setSortOrder,
    setPage
  } = useSalesData();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Retail Sales Management System</h1>
      </header>

      <div className="top-bar">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={() => setSearchTerm(searchTerm)}
        />

        <SortDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
      </div>

      <div className="content-layout">
        <aside className="sidebar">
          <FilterPanel filterOptions={filterOptions} filters={filters} onChange={setFilters} />
        </aside>

        <main className="main-content">
          {loading && <div className="status">Loading...</div>}
          {error && <div className="status error">{error}</div>}

          <SalesTable data={sales} />
          <PaginationControls pagination={pagination} onPageChange={setPage} />
        </main>
      </div>
    </div>
  );
}
