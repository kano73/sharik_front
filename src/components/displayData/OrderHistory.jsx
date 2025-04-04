import React from "react";
import {Link } from "react-router-dom";


const OrderHistory = ({ data }) => {
    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Order History</h1>
            {data.map((user) => (
                <div key={user.userId} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">User ID: {user.userId}</h2>
                        {user.orders.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-bordered mt-3">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Created At</th>
                                        <th>Status</th>
                                        <th>Items</th>
                                        <th>Delivery Address</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {user.orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>
                                                    <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                                        {order.status}
                                                    </span>
                                            </td>
                                            <td>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="p-2 border rounded mb-2">
                                                        <p><strong>ID:</strong> <Link to={`/product?id=${item.product.id}`}>{item.product.id}</Link></p>
                                                        <p><strong>Name:</strong> {item.product.name}</p>
                                                        <p><strong>Price:</strong> ${item.product.price}</p>
                                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                                    </div>
                                                ))}
                                                <p className="fw-bold">Total: ${order.items.reduce((acc, cur) =>
                                                    acc + cur.product.price * cur.quantity, 0)}</p>
                                            </td>
                                            <td>{order.deliveryAddress}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted">No orders found.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
