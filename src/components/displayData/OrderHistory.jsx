import React from "react";

const OrderHistory = ({ data }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>
            {data.map((user) => (
                <div key={user.userId} className="mb-6 p-4 border rounded-lg shadow">
                    <h2 className="text-xl font-semibold">User ID: {user.userId}</h2>
                    {user.orders.length > 0 ? (
                        <table className="w-full border-collapse mt-2">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Created At</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Items</th>
                                <th className="border p-2">Delivery Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {user.orders.map((order, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
                                    <td className="border p-2">{order.status}</td>
                                    <td className="border p-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>
                                                <span className="font-semibold">Product:</span> {item.productId} ({item.quantity})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border p-2">{order.deliveryAddress}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No orders found.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
