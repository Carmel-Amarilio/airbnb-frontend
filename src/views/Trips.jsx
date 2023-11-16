import { useNavigate } from "react-router";
import { StayHeader } from "../cmps/StayHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadOrders, removeOrder } from "../store/actions/order.actions";
import { utilService } from "../services/util.service";
import { func } from "prop-types";

export function Trips() {

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
        loadOrders({ userId: loggedinUser._id, isGuest: true })
            .catch((err) => {
                console.log(err)
            })
    }

    function onCancel(orderId) {
        removeOrder(orderId)
        _loadOrders()
    }

    function isPastDate(date) {
        const today = new Date()
        return new Date(date) < today
    }

    console.log(orders);
    return (
        <section className="trips main-container">
            <StayHeader isUserPage={true} />
            {!orders.length && <section className="empty-page" >
                <h1> Trips</h1>
                <div>
                    <h2>No trips booked...yet!</h2>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button className="form-btn" onClick={() => navigate("/stay")}> <h3>Start searching</h3></button>
                </div>
            </section>}
            {!!orders.length && <main >
                <h1>{orders.length} Trips</h1>
                <table className="form-table">
                    <tbody>
                        <tr >
                            <th>host</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Listing</th>
                            <th>Total payout</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        {orders.map(order => {
                            const { _id, host, checkIn, checkOut, stay, status , totalPrice} = order
                            if(status === 'negotiations') return
                            return <tr key={_id} >
                                <td className="host flex align-center">
                                    {host.imgUrl ? <img src={host.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{host.fullName[0]}</div>}
                                    <h3>{host.fullName}</h3>
                                </td>
                                <td> <p>{utilService.formatDate(checkIn)}</p> </td>
                                <td> <p>{utilService.formatDate(checkOut)}</p> </td>
                                <td > <p>{stay.name}</p> </td>
                                <td> <p>₪{totalPrice}</p> </td>
                                <td> <p className={status}>{status}</p> </td>
                                <td className="actions ">
                                    <button disabled={isPastDate(checkIn)} className="form-btn" onClick={() => onCancel(_id)}><h3>Cancel trip</h3></button>
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </main>}
        </section>
    )
}