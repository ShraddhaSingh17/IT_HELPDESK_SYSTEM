import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Ticket,
    BarChart3,
    Settings,
    Menu,
    X,
} from "lucide-react";
import React, { useState } from "react";

function Layout({ children, title }) {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div
            className={`min-h-screen flex transition duration-300 ${
                darkMode ? "bg-slate-950" : "bg-slate-100"
            }`}>
            <div
                className={`fixed md:static z-50 top-0 left-0 h-full w-[280px] bg-slate-900 text-white p-6 transition-transform duration-300 
                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-green-400">
                        HelpDesk Pro
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Enterprise Ticket System
                    </p>
                </div>

                <div className="flex justify-end md:hidden mb-4">
                    <button onClick={() => setSidebarOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl cursor-pointer hover:bg-slate-700 transition">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl cursor-pointer hover:bg-slate-700 transition">
                        <Ticket size={20} />
                        <span>Tickets</span>
                    </Link>

                    <Link
                        to="/analytics"
                        className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl cursor-pointer hover:bg-slate-700 transition">
                        <BarChart3 size={20} />
                        <span>Analytics</span>
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl cursor-pointer hover:bg-slate-700 transition">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </div>
            </div>

            <div className="flex-1">
                <div
                    className={`shadow-sm px-8 py-5 flex justify-between items-center transition duration-300 ${
                        darkMode
                            ? "bg-slate-900 text-white"
                            : "bg-white text-slate-800"
                    }`}>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden">
                            <Menu size={28} />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <p className="text-slate-500 mt-1">
                                Welcome back, {user.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="mr-4 bg-slate-800 text-white px-4 py-2 rounded-xl">
                            {darkMode ? "Bright Mode" : "Dark Mode"}
                        </button>

                        <button
                            onClick={() => {
                                localStorage.removeItem("user");
                                window.location.reload();
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition duration-300
                        hover:scale-105
                        active:scale-95
                        shadow-sm hover:shadow-md">
                            Logout
                        </button>
                    </div>
                </div>

                <div
                    className={`p-4 sm:p-8 transition duration-300 ${
                        darkMode ? "text-white" : "text-slate-800"
                    }`}>
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { darkMode }),
                    )}
                </div>
            </div>
        </div>
    );
}

export default Layout;
