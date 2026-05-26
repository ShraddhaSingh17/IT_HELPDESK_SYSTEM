import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import Comments from "./Comments";

function MyTickets({darkMode}) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/get_tickets.php?user_id=${user.id}`,
            );

            setTickets(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-10 text-slate-500 text-lg">
                Loading tickets...
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-green-700">
                My Tickets
            </h2>

            <div
                className="grid gap-4
            hover:-translate-y-1
            duration-300">
                {tickets.length === 0 && (
                    <div
                        className={`p-10 rounded-3xl text-center shadow-sm border
${
    darkMode
        ? "bg-slate-900 border-slate-700 text-white"
        : "bg-white border-slate-200"
}`}>
                        <h2 className="text-2xl font-bold text-slate-700 mb-3">
                            No Tickets Yet
                        </h2>

                        <p className="text-slate-500">
                            Create your first support ticket.
                        </p>
                    </div>
                )}
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className={`p-6 rounded-3xl shadow-sm border transition
${
    darkMode
        ? "bg-slate-900 border-slate-700 text-white"
        : "bg-white border-slate-200 text-slate-800"
}`}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">
                                {ticket.title}
                            </h3>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                {ticket.status}
                            </span>
                        </div>

                        <p
                            className={`${darkMode ? "text-slate-300" : "text-gray-600"} mb-4`}>
                            {ticket.description}
                        </p>

                        {ticket.attachment && (
                            <a href={`${API_BASE_URL}/uploads/${ticket.attachment}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-500 underline block mb-4">
                                View Attachment
                            </a>
                        )}

                        <div className="flex gap-3">
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                Priority: {ticket.priority}
                            </span>

                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                Ticket ID: #{ticket.id}
                            </span>
                        </div>

                        <Comments ticketId={ticket.id} darkMode={darkMode} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyTickets;
