export default function SortDropdown({ sortBy, sortOrder, onSortByChange, onSortOrderChange }) {
  return (
    <div className="sort-dropdown">
      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>

      <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
