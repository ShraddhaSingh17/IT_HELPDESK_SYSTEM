import axios from "axios";
import { API_BASE_URL } from "../api";
import { useState } from "react";
import { motion } from "framer-motion";

function Register({ setShowRegister }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/register.php`,
                formData,
            );

            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl w-[400px] text-white">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-500">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 p-3 rounded-lg mb-4 text-white placeholder-gray-300 outline-none focus:border-green-500"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 p-3 rounded-lg mb-4 text-white placeholder-gray-300 outline-none focus:border-green-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 p-3 rounded-lg mb-4 text-white placeholder-gray-300 outline-none focus:border-green-500"
                />

                <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg ">
                    Register
                </motion.button>

                <p
                    onClick={() => setShowRegister(false)}
                    className="text-center mt-4 text-green-500 cursor-pointer">
                    Already have an account? Login
                </p>
            </motion.div>
        </motion.div>
    );
}

export default Register;
