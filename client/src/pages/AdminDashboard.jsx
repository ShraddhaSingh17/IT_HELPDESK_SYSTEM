import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import StatsCards from "./StatsCards";
import Layout from "./Layout";
import CreateTicket from "./CreateTicket";
import ManageTickets from "./ManageTickets";
import AnalyticsCharts from "./AnalyticsCharts";

function AdminDashboard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/get_all_tickets.php`,
            );

            setTickets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title="Admin Dashboard">
            <StatsCards tickets={tickets} />
            <AnalyticsCharts tickets={tickets} />
            <CreateTicket />
            <ManageTickets />
        </Layout>
    );
}

export default AdminDashboard;
