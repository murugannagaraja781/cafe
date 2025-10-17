import React, { useEffect, useState } from "react";

export default function PurchaseList() {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    unit: "pcs",
    totalCost: "",
  });

  useEffect(() => {
    fetch("/api/purchases")
      .then((res) => res.json())
      .then(setPurchases);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setPurchases((prev) => [...prev, updated]);
      setForm({ item: "", quantity: "", unit: "pcs", totalCost: "" });
    }
  };

  return (
    <div>
      <h2>Purchase List</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="item"
          placeholder="Item"
          value={form.item}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Qty"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="unit"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
        />
        <input
          name="totalCost"
          type="number"
          placeholder="Total Cost"
          value={form.totalCost}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Purchase</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Total Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p._id}>
              <td>{p.item}</td>
              <td>{p.quantity}</td>
              <td>{p.unit}</td>
              <td>{p.totalCost}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
