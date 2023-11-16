import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StayHeader } from "../cmps/StayHeader";
import { loadOrders, updateOrder } from "../store/actions/order.actions";
import { useEffect } from "react";
import { utilService } from "../services/util.service";

export function Reservations() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            _loadOrders()
        }
    }, [loggedinUser])

    function _loadOrders() {
        loadOrders({ userId: loggedinUser._id })
            .catch((err) => {
                console.log(err)
            })
    }

    function setStatus(order, newStatus) {
        const newMsgs = order.msgs;
        newMsgs.push({
            id: utilService.makeId(),
            text: `${newStatus === "approved" ? "Your invitation has been approved!" : "Sorry, your order has been rejected"}`,
            by: loggedinUser
        })
        try {
            updateOrder({ ...order, status: newStatus, msgs: newMsgs })
            _loadOrders()
        } catch (error) {
            console.log("Had issues changing thr status", error);
        }
    }

    console.log(orders);

    return (
        <section className="reservations main-container">
            <StayHeader isUserPage={true} />

            {!orders.length && <section className="empty-page" >
                <h1> Reservations</h1>
                <div>
                    <h2>No trips reservations...yet!</h2>
                    <p>It's time to advertise your home in the best possible way</p>
                    <button className="form-btn" onClick={() => navigate("/about-your-place")}> <h3>Airbnb your home</h3></button>
                </div>

            </section>}
            {!!orders.length && <main >
                <h1>{orders.length} Reservations</h1>
                <table className="form-table">
                    <tbody>
                        <tr >
                            <th>Guest</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Listing</th>
                            <th>Total payout</th>
                            <th>Status</th>
                            <th>To do</th>
                        </tr>
                        {orders.map(order => {
                            const { _id, buyer, checkIn, checkOut, stay, status, totalPrice } = order
                            if(status === 'negotiations') return
                            return <tr key={_id} >
                                <td className="buyer flex align-center">
                                    {buyer.imgUrl ? <img src={buyer.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{buyer.fullName[0]}</div>}
                                    <h3>{buyer.fullName}</h3>
                                </td>
                                <td> <p>{utilService.formatDate(checkIn)}</p> </td>
                                <td> <p>{utilService.formatDate(checkOut)}</p> </td>
                                <td className="name ">
                                    {/* <img src={stay.imgUrl} /> */}
                                    <p>{stay.name}</p>
                                </td>
                                <td> <p>₪{totalPrice}</p> </td>
                                <td> <p className={status}>{status}</p> </td>
                                <td className="to-do ">
                                    <button disabled={status != 'pending'} className="approve btn" onClick={() => setStatus(order, "approved")}>Approve</button>
                                    <button disabled={status != 'pending'} className="reject btn" onClick={() => setStatus(order, "rejected")}>Reject</button>
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </main>}
        </section>
    )
}