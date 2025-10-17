import React, { useEffect, useState } from "react";

export default function SalesReport() {
  const [report, setReport] = useState({ total: 0, count: 0 });

  useEffect(() => {
    fetch("/api/reports/sales")
      .then((res) => res.json())
      .then(setReport);
  }, []);

  return (
    <div>
      <h2>Sales Report</h2>
      <p>Total Sales: ₹{report.total}</p>
      <p>Number of Invoices: {report.count}</p>
    </div>
  );
}
