function StatsCards({ tickets, darkMode }) {
    const totalTickets = tickets.length;

    const openTickets = tickets.filter(
        (ticket) => ticket.status === "open",
    ).length;

    const resolvedTickets = tickets.filter(
        (ticket) => ticket.status === "resolved",
    ).length;

    const highPriorityTickets = tickets.filter(
        (ticket) => ticket.priority === "high",
    ).length;

    const cards = [
        {
            title: "Total Tickets",
            value: totalTickets,
        },
        {
            title: "Open Tickets",
            value: openTickets,
        },
        {
            title: "Resolved Tickets",
            value: resolvedTickets,
        },
        {
            title: "High Priority Tickets",
            value: highPriorityTickets,
        },
    ];

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8
        hover:-translate-y-1
            duration-300">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-3xl shadow-sm border transition
                    ${
                        darkMode
                            ? "bg-slate-900 border-slate-700 text-white"
                            : "bg-white border-slate-200 text-slate-800"
                    }`}>
                    <p className="text-slate-500 mb-3">{card.title}</p>

                    <h2 className="text-4xl font-bold text-slate-500">
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;
