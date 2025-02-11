





import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa"; // Ensure the cart icon is properly imported

const Landingpage = () => {
  const [loadingProductId, setLoadingProductId] = useState(null); // Track which product is being loaded
  const [cart, setCart] = useState([]); // Optional: Track the cart

  const products = [
    { id: 1, name: "Fresh Mangoes", price: 80, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2fGuHb2HRTfoVawM5E5q_Mw6BgmhZa__Eg&s" },
    { id: 2, name: "Organic Spinach", price: 50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyt_vuaGTi82qopFHXcT1Afh4Dft662FGkw&s" },
    { id: 3, name: "Cow Milk", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShu7nSW1WZKGdA6ubbPw3L1FAbbv8ZLE1WOQ&s" },
    { id: 4, name: "Juicy Watermelons", price: 40, image: "https://img.freepik.com/premium-photo/fresh-juicy-watermelon-slices-perfect-summer-refreshments-healthy-fruit-platters_1287927-5195.jpg" },
  ];

  const addToCart = (product) => {
    setLoadingProductId(product.id); // Set loading for the current product

    // Simulate adding to cart with a delay
    setTimeout(() => {
      setCart((prevCart) => [...prevCart, product]); // Add product to the cart
      setLoadingProductId(null); // Reset loading state
      alert(`${product.name} has been added to the cart!`);
    }, 1000); // Simulate delay
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Slider Section */}
      <section className="bg-black py-6">
        <div className="container mx-auto">
          {/* You can add your banner or carousel here */}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="mt-3">
                  <h3 className="text-md font-semibold text-white truncate">{product.name}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-green-100 font-bold">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)} // Correct function call here
                  className="mt-4 w-full bg-green-600 text-white text-sm rounded-md py-1 hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaCartArrowDown /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
