import React, { useState } from "react";
import MENU from "../data/menu";
import Cart from "../components/Cart";

const getPrice = (product, size) =>
  size === "small" ? product.priceSmall : product.priceBig;

const POS = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Fresh Juices");

  const addToCart = (product, size) => {
    const price = getPrice(product, size);
    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, size, price, quantity: 1 }]);
    }

    // Clear search box when adding item
    setSearchTerm("");
  };

  const categories = [...new Set(MENU.map((item) => item.category))];

  // Filtered menu based on search term and category
  const searchedMenu = MENU.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMenu = searchedMenu.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 h-screen bg-gray-100 overflow-hidden font-sans">
      {/* LEFT SECTION */}
      <div className="lg:col-span-9 flex flex-col p-4 bg-white shadow-xl overflow-y-auto">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b pb-3 mb-4 sticky top-0 bg-white z-10">
          {/* Category Tabs */}
          <div className="flex space-x-3 overflow-x-auto whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchTerm(""); // Reset search on category change
                }}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200
                  ${
                    activeCategory === category
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-800 hover:bg-orange-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative ml-4">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`transition-all duration-300 ease-in-out p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400
                ${
                  searchTerm === ""
                    ? "w-[280px] md:w-[300px] lg:w-[360px]"
                    : "w-[220px] md:w-[260px] lg:w-[280px]"
                }`}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-grow pb-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="menu-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200 hover:border-orange-400 p-2"
            >
              <div className="relative h-40  overflow-hidden rounded-xl">
                <img
                  width={100}
                  src={item.img}
                  alt={item.name}
                  className=" object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-2 pt-3 flex flex-col justify-between h-full">
                <p className="text-sm font-semibold truncate text-gray-900 mb-2">
                  {item.name}
                </p>

                {/* Size/Price Buttons */}
                {item.priceSmall && !item.priceBig && (
                  <button
                    onClick={() => addToCart(item, "small")}
                    className="w-full py-2 text-xs bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl shadow-md hover:from-orange-500 hover:to-orange-600 transition-all"
                  >
                    Add - ₹{item.priceSmall}
                  </button>
                )}

                {item.priceSmall && item.priceBig && (
                  <div className="flex justify-between items-center space-x-2">
                    <button
                      onClick={() => addToCart(item, "small")}
                      className="flex-1 py-2 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl shadow-md hover:from-yellow-500 hover:to-orange-500 transition-all"
                    >
                      S - ₹{item.priceSmall}
                    </button>
                    <button
                      onClick={() => addToCart(item, "big")}
                      className="flex-1 py-2 text-xs bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-xl shadow-md hover:from-red-500 hover:to-pink-600 transition-all"
                    >
                      B - ₹{item.priceBig}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION (Cart) */}
      <div className="lg:col-span-3 bg-gray-50 flex flex-col border-l border-gray-200 shadow-2xl">
        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default POS;
