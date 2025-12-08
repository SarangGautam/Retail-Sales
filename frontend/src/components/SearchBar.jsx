export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-wrapper" style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Search by name or phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1 }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#1f2937",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Search
      </button>
    </div>
  );
}
