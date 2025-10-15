const MENU = [
  // --- Fresh Juices ---
  {
    id: "ju1",
    name: "Watermelon",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju2",
    name: "Muskmelon",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju3",
    name: "Sweet Lime",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju4",
    name: "Orange",
    priceSmall: 50,
    priceBig: 65,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju5",
    name: "Guava",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju6",
    name: "Grapes",
    priceSmall: 50,
    priceBig: 65,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju7",
    name: "Papaya",
    priceSmall: 40,
    priceBig: 55,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju8",
    name: "Sapota",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju9",
    name: "Pineapple",
    priceSmall: 45,
    priceBig: 60,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "ju10",
    name: "Green Grapes",
    priceSmall: 50,
    priceBig: 65,
    category: "Fresh Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },

  // --- Premium Juices ---
  {
    id: "pr1",
    name: "Rose Petals",
    priceSmall: 55,
    priceBig: 70,
    category: "Premium Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "pr2",
    name: "Mango",
    priceSmall: 55,
    priceBig: 70,
    category: "Premium Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "pr3",
    name: "Apple",
    priceSmall: 60,
    priceBig: 75,
    category: "Premium Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "pr4",
    name: "Pomegranate",
    priceSmall: 70,
    priceBig: 85,
    category: "Premium Juices",
    img: "https://cdn-icons-png.flaticon.com/512/1208/1208328.png", // Reduced to 300x300
  },
  {
    id: "pr5",
    name: "Kiwi",
    priceSmall: 80,
    priceBig: 95,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/867351/pexels-photo-867351.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "pr6",
    name: "Dragon Fruit",
    priceSmall: 90,
    priceBig: 105,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/14732155/pexels-photo-14732155.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "pr7",
    name: "Lychee",
    priceSmall: 80,
    priceBig: 95,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/5945842/pexels-photo-5945842.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "pr8",
    name: "Jamun",
    priceSmall: 70,
    priceBig: 85,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/13101186/pexels-photo-13101186.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "pr9",
    name: "Jackfruit",
    priceSmall: 60,
    priceBig: 75,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/7732333/pexels-photo-7732333.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "pr10",
    name: "Strawberry",
    priceSmall: 80,
    priceBig: 95,
    category: "Premium Juices",
    img: "https://images.pexels.com/photos/4033107/pexels-photo-4033107.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },

  // --- Lime Specials ---
  {
    id: "li1",
    name: "Lime Sweet",
    priceSmall: 35,
    priceBig: 50,
    category: "Lime Specials",
    img: "https://images.pexels.com/photos/1202852/pexels-photo-1202852.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "li2",
    name: "Lime Salt",
    priceSmall: 35,
    priceBig: 50,
    category: "Lime Specials",
    img: "https://images.pexels.com/photos/4021991/pexels-photo-4021991.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },

  // --- Blends & Smoothies ---
  {
    id: "bl1",
    name: "Strawberry + Banana",
    priceSmall: 85,
    priceBig: 100,
    category: "Blends & Smoothies",
    img: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "bl2",
    name: "Mango + Orange",
    priceSmall: 60,
    priceBig: 75,
    category: "Blends & Smoothies",
    img: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "bl3",
    name: "Watermelon + Mint",
    priceSmall: 45,
    priceBig: 60,
    category: "Blends & Smoothies",
    img: "https://images.pexels.com/photos/2281861/pexels-photo-2281861.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
  {
    id: "bl4",
    name: "Mixed Fruit / Cocktail",
    priceSmall: 60,
    priceBig: 75,
    category: "Blends & Smoothies",
    // Replaced the external/blog URL with a Pexels one for consistent sizing
    img: "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1", // Reduced to 300x300
  },
];

export default MENU;
