









import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const OrderDetailsPage = () => {
    const [order, setOrder] = useState({ cart: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        if (!orderId) {
            setError("Order ID is missing");
            setLoading(false);
            return;
        }

        fetch(`https://server-fmp.onrender.com/api/v2/order/api/order/${orderId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch order details");
                }
                return res.json();
            })
            .then((data) => {
                setOrder(data.order);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching order details:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [orderId]);

    if (loading) {
        return <div className="text-center p-4 text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500 text-lg font-bold">Error: {error}</div>;
    }

    if (!order) {
        return <div className="text-center p-4 text-lg font-bold">No order details found.</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Order Details</h1>
            <div className="border p-6 rounded-lg shadow-md bg-gray-100">
                <h2 className="text-2xl font-semibold">Order ID: {order._id}</h2>
                <p className="text-lg"><strong>Customer:</strong> {order.userName || "Unknown"}</p>
                <p className="text-lg"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                <p className="text-lg"><strong>Status:</strong> {order.status}</p>
                <p className="text-lg"><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
                
                <h3 className="font-bold mt-4 text-xl">Shipping Address</h3>
                <p className="text-lg"><strong>Name:</strong> {order.shippingAddress.name}</p>
                <p className="text-lg"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}</p>
                <p className="text-lg"><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                
                <h3 className="font-bold mt-4 text-xl">Cart Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {order.cart.map((item, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm bg-white">
                            <img src={item.productId.image} alt={item.productId.name} className="w-full h-40 object-cover rounded-md" />
                            <p className="font-semibold mt-2 text-lg">{item.productId.name}</p>
                            <p className="text-lg"><strong>Category:</strong> {item.productId.category}</p>
                            <p className="text-lg"><strong>Description:</strong> {item.productId.description}</p>
                            <p className="text-lg"><strong>Price:</strong> ₹{item.price}</p>
                            <p className="text-lg"><strong>Quantity:</strong> {item.quantity}</p>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;

