import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import Tickets from "./pages/Tickets";
import SettingsPage from "./pages/SettingsPage";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return showRegister ? (
            <Register setShowRegister={setShowRegister} />
        ) : (
            <Login setShowRegister={setShowRegister} />
        );
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        user.role === "admin" ? (
                            <AdminDashboard />
                        ) : (
                            <Dashboard />
                        )
                    }
                />

                <Route path="/tickets" element={<Tickets />} />

                <Route path="/analytics" element={<Analytics />} />

                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
