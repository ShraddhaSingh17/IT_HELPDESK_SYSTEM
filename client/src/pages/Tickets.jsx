import CreateTicket from "./CreateTicket";
import Layout from "./Layout";
import MyTickets from "./MyTickets"

function Tickets() {
    return (
        <Layout title="Tickets">
            <CreateTicket />
            <MyTickets />
        </Layout>
    );
}

export default Tickets;