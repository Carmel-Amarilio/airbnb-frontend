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

    function _loadOrders(){
        loadOrders({ userId: loggedinUser._id })
            .catch((err) => {
                console.log(err)
            })
    }

    function setStatus(order, newStatus) {
        try {
            updateOrder({ ...order, status: newStatus })
            _loadOrders()
        } catch (error) {
            console.log("Had issues changing thr status", error);
        }
    }

    console.log(orders);
    return (
        <section className="reservations main-container">
            <StayHeader isUserPage={true} />
            <main >
                <h1>{orders.length} reservations</h1>
                <table className="form-table">
                    <tbody>
                        <tr>
                            <th>Guest</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Listing</th>
                            <th>Total payout</th>
                            <th>Status</th>
                            <th>To do</th>
                        </tr>
                        {orders.map(order => {
                            const { _id, buyer, checkIn, checkOut, stay, status } = order
                            return <tr key={_id}>
                                <td className="buyer flex align-center">
                                    {buyer.imgUrl ? <img src={buyer.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{buyer.fullName[0]}</div>}
                                    <h3>{buyer.fullName}</h3>
                                </td>
                                <td> <p>{utilService.formatDate(checkIn)}</p> </td>
                                <td> <p>{utilService.formatDate(checkOut)}</p> </td>
                                <td> <p>{stay.name}</p> </td>
                                <td> <p>₪{stay.price}</p> </td>
                                <td> <p className={status}>{status}</p> </td>
                                <td className="to-do ">
                                    <button disabled={status != 'pending'} className="approve btn" onClick={() => setStatus(order, "approved")}>Approve</button>
                                    <button disabled={status != 'pending'} className="reject btn" onClick={() => setStatus(order, "rejected")}>Reject</button>
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </main>
        </section>
    )
}