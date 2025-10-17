import React, { useEffect, useState } from "react";

export default function StacksList() {
  const [stacks, setStacks] = useState([]);
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    unit: "pcs",
    costPrice: "",
  });

  useEffect(() => {
    fetch("/api/stacks")
      .then((res) => res.json())
      .then(setStacks);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/stacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setStacks((prev) =>
        prev.some((s) => s.item === updated.item)
          ? prev.map((s) => (s.item === updated.item ? updated : s))
          : [...prev, updated]
      );
      setForm({ item: "", quantity: "", unit: "pcs", costPrice: "" });
    }
  };

  return (
    <div>
      <h2>Stacks (Inventory)</h2>
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
          name="costPrice"
          type="number"
          placeholder="Cost Price"
          value={form.costPrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Add/Update</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Cost Price</th>
          </tr>
        </thead>
        <tbody>
          {stacks.map((s) => (
            <tr key={s._id}>
              <td>{s.item}</td>
              <td>{s.quantity}</td>
              <td>{s.unit}</td>
              <td>{s.costPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
