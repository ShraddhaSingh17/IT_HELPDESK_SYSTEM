import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import Comments from "./Comments";
import ActivityLogs from "./ActivityLogs";
import { AlertCircle, CheckCircle2 } from "lucide-react";

function ManageTickets({ darkMode }) {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [assignedFilter, setAssignedFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 5;

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/get_all_tickets.php`,
            );

            setTickets(response.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/update_ticket_status.php`,
                {
                    id,
                    status,
                },
            );

            alert(response.data.message);

            const user = JSON.parse(localStorage.getItem("user"));
            await axios.post(`${API_BASE_URL}/add_log.php`, {
                ticket_id: id,
                user_id: user.id,
                action: `changed status to ${status}`,
            });

            fetchTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const updatePriority = async (id, priority) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/update_priority.php`,
                {
                    id,
                    priority,
                },
            );

            alert(response.data.message);

            const user = JSON.parse(localStorage.getItem("user"));
            await axios.post(`${API_BASE_URL}/add_log.php`, {
                ticket_id: id,
                user_id: user.id,
                action: `changed priority to ${priority}`,
            });

            fetchTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTicket = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?",
        );

        if (!confirmDelete) return;

        try {
            const response = await axios.post(
                `${API_BASE_URL}/delete_ticket.php`,
                {
                    id,
                },
            );

            alert(response.data.message);

            const user = JSON.parse(localStorage.getItem("user"));
            await axios.post(`${API_BASE_URL}/add_log.php`, {
                ticket_id: id,
                user_id: user.id,
                action: "deleted ticket",
            });

            fetchTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const assignTicket = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        try {
            const response = await axios.post(
                `${API_BASE_URL}/assign_ticket.php`,

                {
                    id,
                    assigned_to: user.id,
                },
            );

            alert(response.data.message);

            await axios.post(`${API_BASE_URL}/add_log.php`, {
                ticket_id: id,
                user_id: user.id,
                action: "assigned ticket",
            });

            fetchTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "" || ticket.status === statusFilter;

        const matchesPriority =
            priorityFilter === "" || ticket.priority === priorityFilter;

        const matchesAssigned =
            assignedFilter === "" ||
            ticket.assigned_admin_name === assignedFilter;

        return (
            matchesSearch && matchesStatus && matchesPriority && matchesAssigned
        );
    });

    const indexOfLastTicket = currentPage * ticketsPerPage;

    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

    const currentTickets = filteredTickets.slice(
        indexOfFirstTicket,
        indexOfLastTicket,
    );

    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

    if (loading) {
        return (
            <div className="text-center py-10 text-slate-500 text-lg">
                Loading tickets...
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "open":
                return "bg-blue-100 text-blue-700";

            case "in_progress":
                return "bg-yellow-100 text-yellow-700";

            case "resolved":
                return "bg-green-100 text-green-700";

            case "closed":
                return "bg-slate-100 text-slate-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700";

            case "medium":
                return "bg-yellow-100 text-yellow-700";

            case "low":
                return "bg-green-100 text-green-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getSlaHours = (priority) => {
        switch (priority) {
            case "high":
                return 4;
            case "medium":
                return 24;
            case "low":
                return 72;
            default:
                return 24;
        }
    };

    const getSlaStatus = (createdAt, priority) => {
        const createdTime = new Date(createdAt).getTime();
        const now = new Date().getTime();

        const hoursPassed = (now - createdTime) / (1000 * 60 * 60);

        const slaLimit = getSlaHours(priority);
        const remaining = slaLimit - hoursPassed;
        if (remaining <= 0) {
            return { text: "SLA Breached", color: "text-red-500" };
        } else if (remaining <= 6) {
            return {
                text: `${Math.ceil(remaining)}h left`,
                color: "text-yellow-500",
            };
        } else {
            return {
                text: `${Math.ceil(remaining)}h left`,
                color: "text-green-500",
            };
        }
    };

    return (
        <div>
            <h2 className="text-2xl mt-12 font-bold mb-8 text-green-700">
                Manage Tickets
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}>
                    <option value="">All Status</option>

                    <option value="open">Open</option>

                    <option value="in_progress">In Progress</option>

                    <option value="resolved">Resolved</option>

                    <option value="closed">Closed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}>
                    <option value="">All Priorities</option>

                    <option value="low">Low</option>

                    <option value="medium">Medium</option>

                    <option value="high">High</option>
                </select>
            </div>

            <div
                className="grid gap-4
            hover:-translate-y-1
            duration-300">
                {filteredTickets.length === 0 && (
                    <div
                        className={`p-10 rounded-3xl text-center shadow-sm border

                    ${
                        darkMode
                            ? "bg-slate-900 text-white border-slate-700"
                            : "bg-white border-slate-200"
                    }`}>
                        <h2 className="text-2xl font-bold text-slate-700 mb-3">
                            No Tickets Found
                        </h2>

                        <p className="text-slate-500">
                            Try changing filters or create a new ticket.
                        </p>
                    </div>
                )}
                {currentTickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className={`p-6 rounded-3xl border hover:shadow-md transition
                        ${
                            darkMode
                                ? "bg-slate-900 border-slate-700 text-white"
                                : "bg-white border-slate-200 text-slate-800"
                        }`}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle
                                    size={20}
                                    className="text-green-500"
                                />
                                <h3 className="text-xl font-semibold">
                                    {ticket.title}
                                </h3>
                            </div>

                            <div className="mt-2 mb-3">
                                {(() => {
                                    const sla = getSlaStatus(
                                        ticket.created_at,
                                        ticket.priority,
                                    );
                                    return (
                                        <span
                                            className={`font-semibold ${sla.color}`}>
                                            {sla.text}
                                        </span>
                                    );
                                })()}
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                            </span>
                        </div>

                        <p
                            className={`${darkMode ? "text-slate-300" : "text-gray-600"} mb-4`}>
                            {ticket.description}
                        </p>

                        {ticket.attachment && (
                            <a
                                href={`${API_BASE_URL}/uploads/${ticket.attachment}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-500 underline block mb-4">
                                View Attachment
                            </a>
                        )}

                        <div className="flex gap-3 flex-wrap">
                            <select
                                value={ticket.priority}
                                onChange={(e) =>
                                    updatePriority(ticket.id, e.target.value)
                                }
                                className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}>
                                <option value="low">Low</option>

                                <option value="medium">Medium</option>

                                <option value="high">High</option>
                            </select>

                            <span
                                className={`px-3 py-3 rounded-full text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                            </span>

                            <select
                                value={assignedFilter}
                                onChange={(e) =>
                                    setAssignedFilter(e.target.value)
                                }
                                className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}>
                                <option value="">All Assigned Admins</option>

                                {[
                                    ...new Set(
                                        tickets
                                            .map(
                                                (ticket) =>
                                                    ticket.assigned_admin_name,
                                            )
                                            .filter(Boolean),
                                    ),
                                ].map((admin, index) => (
                                    <option key={index} value={admin}>
                                        {admin}
                                    </option>
                                ))}
                            </select>

                            <span className="bg-blue-100 text-blue-700 px-3 py-3 rounded-full text-sm">
                                Created By: {ticket.created_by_name}
                            </span>

                            <span className="bg-purple-100 text-purple-700 px-3 py-3 rounded-full text-sm">
                                Assigned To:
                                {""}
                                {ticket.assigned_admin_name || "Unassigned"}
                            </span>
                        </div>

                        <div className="mt-4">
                            <select
                                value={ticket.status}
                                onChange={(e) =>
                                    updateStatus(ticket.id, e.target.value)
                                }
                                className={`border p-3 rounded-xl transition
                    ${
                        darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                    }`}>
                                <option value="open">Open</option>

                                <option value="in_progress">In Progress</option>

                                <option value="resolved">Resolved</option>

                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <button
                            onClick={() => deleteTicket(ticket.id)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl
                            transition duration-300
                            hover:scale-105
                            active:scale-95
                            shadow-sm hover:shadow-md">
                            Delete Ticket
                        </button>

                        <button
                            onClick={() => assignTicket(ticket.id)}
                            className="mt-4 ml-3 bg-blue-500 text-white px-4 py-2 rounded-xl
                            transition duration-300
                            hover:scale-105
                            active:scale-95
                            shadow-sm hover:shadow-md">
                            Assign To Me
                        </button>

                        <Comments ticketId={ticket.id} darkMode={darkMode} />
                        <ActivityLogs ticketId={ticket.id} darkMode={darkMode} />
                    </div>
                ))}
            </div>
            <div className="flex gap-3 justify-center mt-8">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded-xl 
                    transition
                    ${
                        currentPage === index + 1
                            ? "bg-green-500 text-white"
                            : "bg-white text-slate-800"
                    }`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ManageTickets;
