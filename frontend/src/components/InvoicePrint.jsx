import React from "react";

const InvoicePrint = ({ cart, total }) => {
  const date = new Date().toLocaleString();
  return (
    <div style={{ width: 300, fontFamily: "monospace", padding: 10 }}>
      <h2 style={{ textAlign: "center" }}>Café POS Invoice</h2>
      <p>Date: {date}</p>
      <hr />
      {cart.map((item, i) => (
        <p key={i}>
          {item.name} ({item.size}) x {item.quantity} - ₹
          {item.price * item.quantity}
        </p>
      ))}
      <hr />
      <p>Total: ₹{total}</p>
      <p style={{ textAlign: "center" }}>Thank you!</p>
    </div>
  );
};

export default InvoicePrint;
