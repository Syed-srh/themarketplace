import React, { useEffect, useState } from 'react'
import Login from './components/loginPart/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Products from './components/pages/Products'
import Navbar from './components/pages/Navbar'
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Mobiles from './components/pages/Mobiles'
import Laptops from './components/pages/Laptops'
import Shoes from './components/pages/Shoes'
import Gym from './components/pages/Gym'
import CartPayment from './components/pages/CartPayment'
import AddCart from './components/pages/AddCart'
import Payments from './components/pages/Payments'
import Waiting from './components/pages/Waiting'
import SearchResults from './components/pages/SearchResults'
import Footer from './components/pages/Footer'


const App = () => {

  // const isAuthenticated = true;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);


  // This will check the logggedin Detail
const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isAuthenticated));
  }, [isAuthenticated]);

  // User-scoped Cart & Orders State Management
  const getCurrentUserKey = () => {
    return localStorage.getItem('currentUser') || 'guest';
  };

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Sync Cart & Orders whenever authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      const user = getCurrentUserKey();
      const savedCart = localStorage.getItem(`cartItems_${user}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);

      const savedOrders = localStorage.getItem(`orders_${user}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } else {
      setCartItems([]);
      setOrders([]);
    }
  }, [isAuthenticated]);

  const addToCart = (newItem) => {
    const user = getCurrentUserKey();
    setCartItems((prev) => {
      const exists = prev.some(
        (item) => item.category === newItem.category && String(item.id) === String(newItem.id)
      );
      if (exists) return prev;
      const updated = [...prev, newItem];
      localStorage.setItem(`cartItems_${user}`, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (itemToRemove) => {
    const user = getCurrentUserKey();
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.category === itemToRemove.category && String(item.id) === String(itemToRemove.id))
      );
      localStorage.setItem(`cartItems_${user}`, JSON.stringify(updated));
      return updated;
    });
  };

  const onPlaceOrder = (itemsToOrder, addressInfo) => {
    const user = getCurrentUserKey();
    const orderDateStr = new Date().toISOString();
    
    const formattedNewOrders = itemsToOrder.map((item) => ({
      ...item,
      orderId: 'OD' + Math.floor(1000000000 + Math.random() * 9000000000),
      orderDate: orderDateStr,
      address: addressInfo
    }));

    // 1. Add to user-specific orders
    setOrders((prev) => {
      const updated = [...formattedNewOrders, ...prev];
      localStorage.setItem(`orders_${user}`, JSON.stringify(updated));
      return updated;
    });

    // 2. Remove ordered items from user-specific cart
    setCartItems((prev) => {
      const remaining = prev.filter(
        (cartItem) => !itemsToOrder.some(
          (ordered) => ordered.category === cartItem.category && String(ordered.id) === String(cartItem.id)
        )
      );
      localStorage.setItem(`cartItems_${user}`, JSON.stringify(remaining));
      return remaining;
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setCartItems([]);
    setOrders([]);
  };




  const [isLoading, setIsLoading] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  checkAuth();
}, []);

if (isLoading) {
  return <div>Loading...</div>;
}


 const products = [
  {
    id: 1,
    name: "TECHIO AirBeats Wireless Earbuds with Dual Mic ENC and Bluetooth 5.3",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
    rating: "3.6",
    reviews: "2,932",
    price: "500",
    oldPrice: "4,999",
    discount: "89",
  },

  {
    id: 2,
    name: "boAt Rockerz Wireless Bluetooth Headphones with Powerful Bass",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    rating: "4.1",
    reviews: "1,842",
    price: "1,299",
    oldPrice: "3,499",
    discount: "62",
  },

  {
    id: 3,
    name: "Noise ColorFit Smart Watch with AMOLED Display and Fitness Tracking",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    rating: "4.2",
    reviews: "8,421",
    price: "1,499",
    oldPrice: "4,999",
    discount: "70",
  },

  {
    id: 4,
    name: "Nike Revolution Running Shoes for Men with Lightweight Comfort",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "5,156",
    price: "2,499",
    oldPrice: "5,999",
    discount: "58",
  },

  {
    id: 5,
    name: "American Tourister Casual Backpack with Laptop Compartment",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "3,231",
    price: "999",
    oldPrice: "2,499",
    discount: "60",
  },

  {
    id: 6,
    name: "Samsung Galaxy Smartphone with AMOLED Display and Fast Charging",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    rating: "4.5",
    reviews: "11,927",
    price: "14,999",
    oldPrice: "19,999",
    discount: "25",
  },
];

const mobiles = [
  {
    id: 1,
    name: "Samsung Galaxy S24 5G with Dynamic AMOLED 2X Display",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "12,482",
    price: "59,999",
    oldPrice: "79,999",
    discount: "25",
  },

  {
    id: 2,
    name: "Apple iPhone 15 with A16 Bionic Chip and Super Retina Display",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80",
    rating: "4.6",
    reviews: "8,921",
    price: "59,999",
    oldPrice: "69,900",
    discount: "14",
  },

  {
    id: 3,
    name: "OnePlus 12 5G with Snapdragon 8 Gen 3 and AMOLED Display",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
    rating: "4.5",
    reviews: "6,742",
    price: "54,999",
    oldPrice: "64,999",
    discount: "15",
  },

  {
    id: 4,
    name: "Google Pixel 8 5G with Tensor G3 Processor and OLED Display",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "4,231",
    price: "42,999",
    oldPrice: "59,999",
    discount: "28",
  },

  {
    id: 5,
    name: "Redmi Note 13 Pro 5G with 200MP Camera and AMOLED Display",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80",
    rating: "4.2",
    reviews: "18,532",
    price: "24,999",
    oldPrice: "32,999",
    discount: "24",
  },

  {
    id: 6,
    name: "Nothing Phone 2 5G with Glyph Interface and OLED Display",
    image:
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "5,927",
    price: "34,999",
    oldPrice: "44,999",
    discount: "22",
  },
];

const laptops = [
  {
    id: 1,
    name: "ASUS Vivobook 15 Intel Core i5 12th Gen Laptop with 15.6-inch Full HD Display",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "8,421",
    price: "49,990",
    oldPrice: "67,990",
    discount: "26",
  },

  {
    id: 2,
    name: "HP 15s Intel Core i5 13th Gen Laptop with 15.6-inch Full HD Display",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "12,384",
    price: "54,999",
    oldPrice: "71,999",
    discount: "24",
  },

  {
    id: 3,
    name: "Lenovo IdeaPad Slim 3 Intel Core i5 13th Gen Laptop with 15.6-inch Display",
    image:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=80",
    rating: "4.2",
    reviews: "6,742",
    price: "51,490",
    oldPrice: "68,490",
    discount: "24",
  },

  {
    id: 4,
    name: "Dell Inspiron 15 Intel Core i5 12th Gen Laptop with 15.6-inch Full HD Display",
    image:
      "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "5,231",
    price: "57,990",
    oldPrice: "74,999",
    discount: "23",
  },

  {
    id: 5,
    name: "Acer Aspire Lite AMD Ryzen 5 Laptop with 15.6-inch Full HD Display",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80",
    rating: "4.1",
    reviews: "4,927",
    price: "39,990",
    oldPrice: "52,990",
    discount: "25",
  },

  {
    id: 6,
    name: "Apple MacBook Air M2 with 13.6-inch Liquid Retina Display and 8GB RAM",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
    rating: "4.7",
    reviews: "9,842",
    price: "79,990",
    oldPrice: "99,900",
    discount: "20",
  },
];

const shoes = [
  {
    id: 1,
    name: "Nike Revolution 7 Running Shoes for Men with Lightweight Cushioning",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "8,421",
    price: "2,499",
    oldPrice: "4,999",
    discount: "50",
  },

  {
    id: 2,
    name: "Adidas Grand Court Base 2.0 Casual Sneakers for Men",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "6,842",
    price: "2,199",
    oldPrice: "4,499",
    discount: "51",
  },

  {
    id: 3,
    name: "Puma Softride Enzo NXT Running Shoes with Soft Foam Cushioning",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80",
    rating: "4.2",
    reviews: "5,327",
    price: "2,799",
    oldPrice: "5,999",
    discount: "53",
  },

  {
    id: 4,
    name: "Skechers Go Run Lightweight Sports Shoes for Men",
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80",
    rating: "4.5",
    reviews: "4,921",
    price: "3,499",
    oldPrice: "6,999",
    discount: "50",
  },

  {
    id: 5,
    name: "Campus Men's Running Shoes with Breathable Mesh and Comfortable Sole",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
    rating: "4.1",
    reviews: "12,643",
    price: "899",
    oldPrice: "1,999",
    discount: "55",
  },

  {
    id: 6,
    name: "Reebok Flexagon Energy 4 Training Shoes for Men",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "7,284",
    price: "2,399",
    oldPrice: "4,999",
    discount: "52",
  },
];

const gym = [
  {
    id: 1,
    name: "Boldfit Resistance Bands Set for Workout, Exercise and Home Gym",
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "7,842",
    price: "499",
    oldPrice: "1,499",
    discount: "67",
  },

  {
    id: 2,
    name: "AmazonBasics Neoprene Dumbbells Set for Home Workout and Strength Training",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
    rating: "4.4",
    reviews: "12,531",
    price: "899",
    oldPrice: "1,999",
    discount: "55",
  },

  {
    id: 3,
    name: "Strauss Adjustable Skipping Rope with Comfortable Handles for Cardio Workout",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80",
    rating: "4.2",
    reviews: "5,624",
    price: "299",
    oldPrice: "799",
    discount: "63",
  },

  {
    id: 4,
    name: "Lifelong Yoga Mat with Anti-Slip Surface for Exercise and Home Workout",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80",
    rating: "4.5",
    reviews: "9,327",
    price: "599",
    oldPrice: "1,499",
    discount: "60",
  },

  {
    id: 5,
    name: "Kobo Adjustable Hand Grip Strengthener for Wrist and Forearm Training",
    image:
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=500&q=80",
    rating: "4.1",
    reviews: "4,218",
    price: "249",
    oldPrice: "699",
    discount: "64",
  },

  {
    id: 6,
    name: "Fitkit Push Up Board with Multiple Grip Positions for Chest and Strength Training",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80",
    rating: "4.3",
    reviews: "6,941",
    price: "799",
    oldPrice: "1,999",
    discount: "60",
  },
];

const product1 = [
  {
    id: 1,
    name: "TECHIO AirBeats Wireless Earbuds with Dual Mic ENC and Bluetooth 5.3",
    rating: "3.6",
    reviews: "2,932",
    price: "500",
    oldPrice: "4,999",
    discount: "89",
    images: {
      frontView: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 2,
    name: "boAt Rockerz Wireless Bluetooth Headphones with Powerful Bass",
    rating: "4.1",
    reviews: "1,842",
    price: "1,299",
    oldPrice: "3,499",
    discount: "62",
    images: {
      frontView: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 3,
    name: "Noise ColorFit Smart Watch with AMOLED Display and Fitness Tracking",
    rating: "4.2",
    reviews: "8,421",
    price: "1,499",
    oldPrice: "4,999",
    discount: "70",
    images: {
      frontView: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 4,
    name: "Nike Revolution Running Shoes for Men with Lightweight Comfort",
    rating: "4.3",
    reviews: "5,156",
    price: "2,499",
    oldPrice: "5,999",
    discount: "58",
    images: {
      frontView: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 5,
    name: "American Tourister Casual Backpack with Laptop Compartment",
    rating: "4.4",
    reviews: "3,231",
    price: "999",
    oldPrice: "2,499",
    discount: "60",
    images: {
      frontView: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 6,
    name: "Samsung Galaxy Smartphone with AMOLED Display and Fast Charging",
    rating: "4.5",
    reviews: "11,927",
    price: "14,999",
    oldPrice: "19,999",
    discount: "25",
    images: {
      frontView: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  }
];

const mobile1 = [
  {
    id: 1,
    name: "Samsung Galaxy S24 5G with Dynamic AMOLED 2X Display",
    rating: "4.4",
    reviews: "12,482",
    price: "59,999",
    oldPrice: "79,999",
    discount: "25",
    images: {
      frontView: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 2,
    name: "Apple iPhone 15 with A16 Bionic Chip and Super Retina Display",
    rating: "4.6",
    reviews: "8,921",
    price: "59,999",
    oldPrice: "69,900",
    discount: "14",
    images: {
      frontView: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 3,
    name: "OnePlus 12 5G with Snapdragon 8 Gen 3 and AMOLED Display",
    rating: "4.5",
    reviews: "6,742",
    price: "54,999",
    oldPrice: "64,999",
    discount: "15",
    images: {
      frontView: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 4,
    name: "Google Pixel 8 5G with Tensor G3 Processor and OLED Display",
    rating: "4.3",
    reviews: "4,231",
    price: "42,999",
    oldPrice: "59,999",
    discount: "28",
    images: {
      frontView: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 5,
    name: "Redmi Note 13 Pro 5G with 200MP Camera and AMOLED Display",
    rating: "4.2",
    reviews: "18,532",
    price: "24,999",
    oldPrice: "32,999",
    discount: "24",
    images: {
      frontView: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 6,
    name: "Nothing Phone 2 5G with Glyph Interface and OLED Display",
    rating: "4.4",
    reviews: "5,927",
    price: "34,999",
    oldPrice: "44,999",
    discount: "22",
    images: {
      frontView: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  }
];

const laptops1 = [
  {
    id: 1,
    name: "ASUS Vivobook 15 Intel Core i5 12th Gen Laptop with 15.6-inch Full HD Display",
    rating: "4.3",
    reviews: "8,421",
    price: "49,990",
    oldPrice: "67,990",
    discount: "26",
    images: {
      frontView: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 2,
    name: "HP 15s Intel Core i5 13th Gen Laptop with 15.6-inch Full HD Display",
    rating: "4.4",
    reviews: "12,384",
    price: "54,999",
    oldPrice: "71,999",
    discount: "24",
    images: {
      frontView: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 3,
    name: "Lenovo IdeaPad Slim 3 Intel Core i5 13th Gen Laptop with 15.6-inch Display",
    rating: "4.2",
    reviews: "6,742",
    price: "51,490",
    oldPrice: "68,490",
    discount: "24",
    images: {
      frontView: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 4,
    name: "Dell Inspiron 15 Intel Core i5 12th Gen Laptop with 15.6-inch Full HD Display",
    rating: "4.3",
    reviews: "5,231",
    price: "57,990",
    oldPrice: "74,999",
    discount: "23",
    images: {
      frontView: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 5,
    name: "Acer Aspire Lite AMD Ryzen 5 Laptop with 15.6-inch Full HD Display",
    rating: "4.1",
    reviews: "4,927",
    price: "39,990",
    oldPrice: "52,990",
    discount: "25",
    images: {
      frontView: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 6,
    name: "Apple MacBook Air M2 with 13.6-inch Liquid Retina Display and 8GB RAM",
    rating: "4.7",
    reviews: "9,842",
    price: "79,990",
    oldPrice: "99,900",
    discount: "20",
    images: {
      frontView: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  }
];

const shoes1 = [
  {
    id: 1,
    name: "Nike Revolution 7 Running Shoes for Men with Lightweight Cushioning",
    rating: "4.3",
    reviews: "8,421",
    price: "2,499",
    oldPrice: "4,999",
    discount: "50",
    images: {
      frontView: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 2,
    name: "Adidas Grand Court Base 2.0 Casual Sneakers for Men",
    rating: "4.4",
    reviews: "6,842",
    price: "2,199",
    oldPrice: "4,499",
    discount: "51",
    images: {
      frontView: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 3,
    name: "Puma Softride Enzo NXT Running Shoes with Soft Foam Cushioning",
    rating: "4.2",
    reviews: "5,327",
    price: "2,799",
    oldPrice: "5,999",
    discount: "53",
    images: {
      frontView: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 4,
    name: "Skechers Go Run Lightweight Sports Shoes for Men",
    rating: "4.5",
    reviews: "4,921",
    price: "3,499",
    oldPrice: "6,999",
    discount: "50",
    images: {
      frontView: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 5,
    name: "Campus Men's Running Shoes with Breathable Mesh and Comfortable Sole",
    rating: "4.1",
    reviews: "12,643",
    price: "899",
    oldPrice: "1,999",
    discount: "55",
    images: {
      frontView: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 6,
    name: "Reebok Flexagon Energy 4 Training Shoes for Men",
    rating: "4.3",
    reviews: "7,284",
    price: "2,399",
    oldPrice: "4,999",
    discount: "52",
    images: {
      frontView: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  }
];

const gym1 = [
  {
    id: 1,
    name: "Boldfit Resistance Bands Set for Workout, Exercise and Home Gym",
    rating: "4.3",
    reviews: "7,842",
    price: "499",
    oldPrice: "1,499",
    discount: "67",
    images: {
      frontView: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 2,
    name: "AmazonBasics Neoprene Dumbbells Set for Home Workout and Strength Training",
    rating: "4.4",
    reviews: "12,531",
    price: "899",
    oldPrice: "1,999",
    discount: "55",
    images: {
      frontView: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 3,
    name: "Strauss Adjustable Skipping Rope with Comfortable Handles for Cardio Workout",
    rating: "4.2",
    reviews: "5,624",
    price: "299",
    oldPrice: "799",
    discount: "63",
    images: {
      frontView: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 4,
    name: "Lifelong Yoga Mat with Anti-Slip Surface for Exercise and Home Workout",
    rating: "4.5",
    reviews: "9,327",
    price: "599",
    oldPrice: "1,499",
    discount: "60",
    images: {
      frontView: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 5,
    name: "Kobo Adjustable Hand Grip Strengthener for Wrist and Forearm Training",
    rating: "4.1",
    reviews: "4,218",
    price: "249",
    oldPrice: "699",
    discount: "64",
    images: {
      frontView: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  },
  {
    id: 6,
    name: "Fitkit Push Up Board with Multiple Grip Positions for Chest and Strength Training",
    rating: "4.3",
    reviews: "6,941",
    price: "799",
    oldPrice: "1,999",
    discount: "60",
    images: {
      frontView: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80",
      topDownView: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80&rot=90",
      sideProfile: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80&flip=h",
      closeUpDetail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80&crop=center&zoom=2"
    }
  }
];
  return (
      // <Login/>
      <BrowserRouter>
        {isAuthenticated && <Navbar cartItems={cartItems} orders={orders} onLogout={handleLogout} />}

      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/products" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/products" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/mobiles" element={<Mobiles mobiles={mobiles} />} />
          <Route path="/laptops" element={<Laptops laptops={laptops} />} />
          <Route path="/shoes" element={<Shoes shoes={shoes} />} />
          <Route path="/gym" element={<Gym gym={gym} />} />
          <Route path="/cartpayment/:category/:id" element={<CartPayment product1={product1} mobile1={mobile1} laptops1={laptops1} shoes1={shoes1} gym1={gym1} addToCart={addToCart} />} />
          <Route path="/addcart/:category/:id" element={<AddCart product1={product1} mobile1={mobile1} laptops1={laptops1} shoes1={shoes1} gym1={gym1} removeFromCart={removeFromCart} addToCart={addToCart} cartItems={cartItems} />} />
          <Route path="/addcart" element={<AddCart product1={product1} mobile1={mobile1} laptops1={laptops1} shoes1={shoes1} gym1={gym1} removeFromCart={removeFromCart} addToCart={addToCart} cartItems={cartItems} />} />
          <Route path="/payments/:category/:id" element={<Payments product1={product1} mobile1={mobile1} laptops1={laptops1} shoes1={shoes1} gym1={gym1} cartItems={cartItems} onPlaceOrder={onPlaceOrder} />} />
          <Route path="/payments" element={<Payments product1={product1} mobile1={mobile1} laptops1={laptops1} shoes1={shoes1} gym1={gym1} cartItems={cartItems} onPlaceOrder={onPlaceOrder} />} />
          <Route path="/waiting" element={<Waiting orders={orders} />} />
          <Route path="/search/:query" element={<SearchResults products={products} mobiles={mobiles} laptops={laptops} shoes={shoes} gym={gym} />} />
          <Route path="/search" element={<SearchResults products={products} mobiles={mobiles} laptops={laptops} shoes={shoes} gym={gym} />} />

          
        </Route>
      </Routes>
      {isAuthenticated && <Footer />}
    </BrowserRouter>



  )
}
export default App
