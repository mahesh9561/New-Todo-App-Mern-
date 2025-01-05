import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

// Utility function to decode and verify token
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return null; // return null if no token

    try {
        const decoded = jwtDecode(token);
        return decoded; // return the decoded token
    } catch (err) {
        console.error("Invalid token", err);
        return null; // return null if token is invalid or expired
    }
};

const AdminProtectedRoute = () => {
    const user = isAuthenticated();
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

const UserProtectedRoute = () => {
    const user = isAuthenticated();
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "user") return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export { AdminProtectedRoute, UserProtectedRoute };