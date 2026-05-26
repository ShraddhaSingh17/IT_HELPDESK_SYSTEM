import CreateTicket from "./CreateTicket";
import Layout from "./Layout";
import ManageTickets from "./ManageTickets";

function Tickets() {
    return (
        <Layout title="Tickets">
            <CreateTicket />
            <ManageTickets />
        </Layout>
    );
}

export default Tickets;