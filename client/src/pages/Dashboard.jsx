import Layout from "./Layout";
import CreateTicket from "./CreateTicket";
import MyTickets from "./MyTickets";

function Dashboard() {
    return (
        <Layout title="User Dashboard">
            <CreateTicket />

            <MyTickets />
        </Layout>
    );
}

export default Dashboard;
