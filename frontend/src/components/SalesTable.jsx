export default function SalesTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="no-results">No results found.</div>;
  }

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Product</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={`${row.customerId}-${row.productId}-${idx}`}>
            <td>{row.date}</td>
            <td>{row.customerName}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.customerRegion}</td>
            <td>{row.productName}</td>
            <td>{row.productCategory}</td>
            <td>{row.quantity}</td>
            <td>{row.finalAmount}</td>
            <td>{row.paymentMethod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
