




import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from '../store.js'; // Import your Redux store

import Layout from './components/layout/Layout';
import Landingpage from './pages/Landingpage';
import About from './components/About';
import FruitsPage from './components/FruitsPage';
import MilkProductsPage from './components/MilkProductPage';
import VegetablesPage from './components/VegetablesPage';
import GrainsPage from './components/GrainsPage';
import Wishlist from './components/Wishlist';
import Contact from './components/Contact';
import Login from './components/Login';
import Registration from './components/Registration';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import SellerDashboard from './pages/Seller';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './components/Unautorise.jsx';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import OrderedList from './components/OrderedList.jsx';
import Services from './pages/Service.jsx';
import OrderDetailsPage from './components/OrderDetailsPage.jsx';
// import { Import } from 'lucide-react';
// import { configDotenv } from 'dotenv';
// Import configDotenv

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />

            {/* Protected Routes */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Landingpage />
                </ProtectedRoute>
              }
            />

            {/* Other Pages */}
            <Route path="about" element={<About />} />
            <Route path="fruits" element={<FruitsPage />} />
            <Route path="milk-products" element={<MilkProductsPage />} />
            <Route path="vegetables" element={<VegetablesPage />} />
            <Route path="grains" element={<GrainsPage />} />
            <Route path="Wishlist" element={<Wishlist />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="SellerDashboard" element={<SellerDashboard />} />
            <Route path="AdminDashboard" element={<AdminDashboard />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="contact" element={<Contact />} />
            <Route path="OrderedList" element={<OrderedList />} />
            <Route path="OrderDetailsPage" element={<OrderDetailsPage />} />
            <Route path="services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
