import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img
              src={p.img}
              alt={p.name}
              className="h-32 w-full object-cover rounded"
            />
            <h2 className="font-bold mt-2">{p.name}</h2>
            <p>Category: {p.category}</p>
            <p>
              Small: ₹{p.priceSmall}, Big: ₹{p.priceBig}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
