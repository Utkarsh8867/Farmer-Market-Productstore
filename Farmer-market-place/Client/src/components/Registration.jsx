












import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Registration = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://server-fmp.onrender.com/api/v2/user/create-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        onClose();
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/1349772438/photo/thoroughbred-horses-grazing-at-sunset-in-a-field.jpg?s=612x612&w=0&k=20&c=VfeAuYgCbUOqs0k7QZB7XStr5nAk6wn2NSYDDZ8hgJQ=')" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:ring-4 focus:ring-green-200"
          >
            Register
          </motion.button>
        </form>
        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-blue-500 hover:underline"
            onClick={handleLoginRedirect}
          >
            Already have an account? Login
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onClose}
          className="mt-4 text-red-500 hover:underline w-full text-center"
        >
          Close
        </motion.button>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Registration;

