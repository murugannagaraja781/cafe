import React, { useEffect, useState } from "react";

export default function BestSellers() {
  const [best, setBest] = useState([]);

  useEffect(() => {
    fetch("/api/reports/best-sellers")
      .then((res) => res.json())
      .then(setBest);
  }, []);

  return (
    <div>
      <h2>Best Sellers</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Total Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {best.map((b) => (
            <tr key={b._id.product + b._id.size}>
              <td>{b._id.product}</td>
              <td>{b._id.size}</td>
              <td>{b.totalSold}</td>
              <td>₹{b.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
