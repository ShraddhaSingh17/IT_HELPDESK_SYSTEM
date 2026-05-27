import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
} from "recharts";

function AnalyticsCharts({ tickets, darkMode }) {
    const statusData = [
        {
            name: "Open",
            value: tickets.filter((ticket) => ticket.status === "open").length,
        },

        {
            name: "In Progress",
            value: tickets.filter((ticket) => ticket.status === "in_progress")
                .length,
        },

        {
            name: "Resolved",
            value: tickets.filter((ticket) => ticket.status === "resolved")
                .length,
        },

        {
            name: "Closed",
            value: tickets.filter((ticket) => ticket.status === "closed")
                .length,
        },
    ];

    const priorityData = [
        {
            name: "Low",
            value: tickets.filter((ticket) => ticket.priority === "low").length,
        },

        {
            name: "Medium",
            value: tickets.filter((ticket) => ticket.priority === "medium")
                .length,
        },

        {
            name: "High",
            value: tickets.filter((ticket) => ticket.priority === "high")
                .length,
        },
    ];

    const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            <div
                className={`p-4 sm:p-6 rounded-3xl shadow-sm border hover:-translate-y-1
            duration-300 overflow-hidden
            ${
                darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-200 text-slate-800"
            }`}>
                <h2 className="text-2xl font-bold mb-6 text-green-700">
                    Ticket Status Analytics
                </h2>

                <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 300}>
                    <PieChart>
                        <Pie
                            data={statusData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label>
                            {statusData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div
                className={`p-4 sm:p-6 rounded-3xl shadow-sm border hover:-translate-y-1
            duration-300 overflow-hidden
            ${
                darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-200 text-slate-800"
            }`}>
                <h2 className="text-2xl font-bold mb-6 text-green-700">
                    Priority Analytics
                </h2>

                <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 300}>
                    <BarChart data={priorityData}>
                        <CartesianGrid strokeDasharray="33" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AnalyticsCharts;
