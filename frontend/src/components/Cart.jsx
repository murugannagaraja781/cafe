import React from "react";

const Cart = ({ cart, setCart }) => {
  const updateQuantity = (id, size, delta) => {
    const newCart = cart
      .map((item) => {
        if (item.id === id && item.size === size) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null);
    setCart(newCart);
  };

  const removeItem = (id, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = subTotal;
  const roundedTotal = Math.round(grandTotal);

  // --- Print Function ---
  const handlePrint = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total: roundedTotal }),
        // credentials: "include", // Only needed if backend uses cookies/session
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save sale");
      }

      // Prepare print content
      const printContent = `
      <html>
        <head>
          <title>POS Receipt</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
            tfoot td { font-weight: bold; }
            .total-row td { border-top: 2px solid #000; }
          </style>
        </head>
        <body>
          <h2>🍹 Cafe POS Receipt</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.size === "small" ? "Regular" : "Large"}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="3">Total</td>
                <td>₹${roundedTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
      `;

      const printWindow = window.open("", "_blank", "width=400,height=600");
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();

      printWindow.onafterprint = () => window.location.reload();
      printWindow.print();
    } catch (error) {
      console.error("Error during printing:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items */}
      <div className="flex-grow p-4 space-y-3 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 pt-8">
            Cart is empty. Add items from the menu!
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between items-center text-sm border-b pb-2"
            >
              <button
                className="mr-2 text-red-400 hover:text-red-600"
                onClick={() => removeItem(item.id, item.size)}
              >
                &times;
              </button>
              <div className="flex flex-col flex-grow">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-xs text-blue-600 capitalize">
                  {item.size === "small" ? "Regular" : "Large"}
                </span>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="px-2 text-red-500 hover:bg-gray-100 rounded-l-lg"
                  onClick={() => updateQuantity(item.id, item.size, -1)}
                >
                  -
                </button>
                <span className="px-3 text-gray-700">{item.quantity}</span>
                <button
                  className="px-2 text-green-500 hover:bg-gray-100 rounded-r-lg"
                  onClick={() => updateQuantity(item.id, item.size, 1)}
                >
                  +
                </button>
              </div>
              <span className="ml-4 font-semibold text-gray-800 w-16 text-right">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total & Print Button */}
      <div className="p-4 border-t border-gray-300 bg-white">
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{roundedTotal.toFixed(2)}</span>
        </div>
        <button
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 mt-3"
          onClick={handlePrint}
        >
          Print POS
        </button>
      </div>
    </div>
  );
};

export default Cart;
