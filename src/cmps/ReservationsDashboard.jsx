import { BarChartLogInUp } from "./BarChartLogInUp";
import { DoughnutStayNames } from "./DoughnutStayNames";

export function ReservationsDashboard({orders}) {

    return (
        <section className="reservations-dashboard ">
            <BarChartLogInUp orders={orders}/>
            <section className="status chart">
                <h1>Reservations status</h1>
                <article className="flex align-center space-between">
                    <p>Pending</p>
                    <p className="pending">{orders.filter(order => order.status === 'pending').length}</p>
                </article>
                <article className="flex align-center space-between">
                    <p>Approved</p>
                    <p className="approved">{orders.filter(order => order.status === 'approved').length}</p>
                </article>
                <article className="flex align-center space-between">
                    <p>Rejected</p>
                    <p className="rejected"> {orders.filter(order => order.status === 'rejected').length}</p>
                </article>
            </section>
            <DoughnutStayNames orders={orders}/>
        </section>
    )
}