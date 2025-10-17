import React, { useEffect, useState } from "react";

export default function ProfitLossReport() {
  const [data, setData] = useState({
    salesTotal: 0,
    purchaseTotal: 0,
    profit: 0,
    loss: 0,
  });

  useEffect(() => {
    fetch("/api/reports/profit-loss")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>Profit & Loss Report</h2>
      <p>Total Sales: ₹{data.salesTotal}</p>
      <p>Total Purchases: ₹{data.purchaseTotal}</p>
      <p>Profit: ₹{data.profit}</p>
      {data.loss > 0 && <p style={{ color: "red" }}>Loss: ₹{data.loss}</p>}
    </div>
  );
}
