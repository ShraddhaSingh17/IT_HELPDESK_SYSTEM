import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
function CreateTicket({ darkMode }) {
    const [file, setFile] = useState();

    const [fileKey, setFileKey] = useState(Date.now());

    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        priority: "low",
    });

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const formData = new FormData();

        formData.append("title", ticket.title);
        formData.append("description", ticket.description);
        formData.append("priority", ticket.priority);
        formData.append("created_by", user.id);

        if (file) {
            formData.append("attachment", file);
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/create_ticket.php`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            alert(response.data.message);

            setTicket({
                title: "",
                description: "",
                priority: "low",
                attachment: "null"
            });

            setFile(null);
            setFileKey(Date.now());

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`p-4 sm:p-6 rounded-3xl shadow-sm border hover:-translate-y-1
            duration-300
        ${
            darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-slate-200 text-slate-800"
        }`}>
            <h2 className="text-2xl font-bold mb-6 text-green-700">
                Create Ticket
            </h2>

            <div className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={ticket.title}
                    placeholder="Ticket Title"
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-xl transition
            ${
                darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    : "bg-white border-slate-300 text-slate-800" 
            }`}
                />

                <textarea
                    name="description"
                    value={ticket.description}
                    placeholder="Describe your issue"
                    rows="5"
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-xl transition
            ${
                darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    : "bg-white border-slate-300 text-slate-800"
            }`}
                />

                <select
                    name="priority"
                    value={ticket.priority}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-xl transition
            ${
                darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    : "bg-white border-slate-300 text-slate-800"
            }`}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <input
                    key={fileKey}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border p-3 rounded-xl"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition duration-300
                        hover:scale-105
                        active:scale-95
                        shadow-sm hover:shadow-md">
                    Submit Ticket
                </button>
            </div>
        </div>
    );
}

export default CreateTicket;
