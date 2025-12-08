export default function FilterPanel({ filterOptions, filters, onChange }) {
  if (!filterOptions) return null;

  const toggleMulti = (key, value) => {
    const current = filters[key] || [];
    const exists = current.includes(value);
    const next = exists ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const handleAgeChange = (field, value) => {
    const range = filters.ageRange || { min: filterOptions.ageRange.min, max: filterOptions.ageRange.max };
    onChange({
      ...filters,
      ageRange: {
        ...range,
        [field]: Number(value) || range[field]
      }
    });
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Customer Region</h4>
        {filterOptions.customerRegions.map((r) => (
          <label key={r}>
            <input
              type="checkbox"
              checked={(filters.customerRegion || []).includes(r)}
              onChange={() => toggleMulti('customerRegion', r)}
            />
            {r}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Gender</h4>
        {filterOptions.genders.map((g) => (
          <label key={g}>
            <input
              type="checkbox"
              checked={(filters.gender || []).includes(g)}
              onChange={() => toggleMulti('gender', g)}
            />
            {g}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Product Category</h4>
        {filterOptions.productCategories.map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              checked={(filters.productCategory || []).includes(c)}
              onChange={() => toggleMulti('productCategory', c)}
            />
            {c}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Payment Method</h4>
        {filterOptions.paymentMethods.map((m) => (
          <label key={m}>
            <input
              type="checkbox"
              checked={(filters.paymentMethod || []).includes(m)}
              onChange={() => toggleMulti('paymentMethod', m)}
            />
            {m}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Age Range</h4>
        <div className="range-inputs">
          <input
            type="number"
            placeholder={String(filterOptions.ageRange.min)}
            value={filters.ageRange?.min ?? ''}
            onChange={(e) => handleAgeChange('min', e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder={String(filterOptions.ageRange.max)}
            value={filters.ageRange?.max ?? ''}
            onChange={(e) => handleAgeChange('max', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
