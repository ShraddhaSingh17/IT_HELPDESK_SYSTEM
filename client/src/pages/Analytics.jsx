import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import AnalyticsCharts from "./AnalyticsCharts";
import { API_BASE_URL } from "../api";

function Analytics() {

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
        <Layout title="Analytics">
            <AnalyticsCharts tickets={tickets} />
        </Layout>
    );
}

export default Analytics;