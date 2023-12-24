import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StayHeader } from "../cmps/StayHeader";
import { addOrderToReservations, loadOrders, updateOrder } from "../store/actions/order.actions";
import { useEffect, useState } from "react";
import { utilService } from "../services/util.service";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ReservationsDashboard } from "../cmps/ReservationsDashboard";
import { socketService } from "../services/socket.service";
import { LoaderPage } from "./LoaderPage";

export function Reservations() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const [sort, setSort] = useState('lastUpdate')
    const [showDashboard, setShowDashboard] = useState(true)



    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            _loadOrders('')

        }
        socketService.on('order-updated', order => {
            console.log('hi updated');
            _loadOrders('lastUpdate')
        })
        socketService.on('order-added', order => {
            console.log('hi added');
            _loadOrders('lastUpdate')
        })
    }, [loggedinUser])

    useEffect(() => {
        let sortBy = 'lastUpdate'
        switch (sort) {
            case 'Guest': sortBy = 'buyer.fullName'; break;
            case 'Check-in': sortBy = 'checkIn'; break;
            case 'Check-Out': sortBy = 'checkOut'; break;
            case 'Listing': sortBy = 'stay.name'; break;
            case 'Total payout': sortBy = 'totalPrice'; break;
            case 'Status': sortBy = 'status'; break;
            default: break;
        }
        _loadOrders(sortBy)
    }, [sort])

    function _loadOrders(sortBy) {
        loadOrders({ userId: loggedinUser._id }, sortBy)
            .catch((err) => {
                console.log(err)
            })
    }

    function onLabel(label) {
        sort === label ? setSort('') : setSort(label)
    }

    function setStatus(order, newStatus) {
        const newMsgs = order.msgs;
        newMsgs.push({
            id: utilService.makeId(),
            text: `${newStatus === "approved" ? "Your invitation has been approved!" : "Sorry, your order has been rejected"}`,
            by: loggedinUser
        })
        try {
            updateOrder({ ...order, status: newStatus, msgs: newMsgs, lastUpdate: Date.now() })
            _loadOrders('')
        } catch (error) {
            console.log("Had issues changing thr status", error);
        }
    }

    function toggleDashboard() {
        setShowDashboard(!showDashboard)
    }

    const thsLabel = ['Guest', 'Check-in', 'Check-Out', 'Listing', 'Total payout', 'Status', 'To do']
    if (!orders) return (<LoaderPage />)
    return (
        <section className="reservations main-container">
            <StayHeader isUserPage={true} />

            {!orders.length ? <section className="empty-page" >
                <h1> Reservations</h1>
                <div>
                    <h2>No trips reservations...yet!</h2>
                    <p>It's time to advertise your home in the best possible way</p>
                    <button className="form-btn" onClick={() => navigate("/about-your-place")}> Aircnc your home</button>
                </div>
            </section> :
                <main >
                    <button className="underline-btn dashboard-btn" onClick={toggleDashboard}>Open dashboard <i className={`fa-solid fa-arrow-${showDashboard ? 'down' : 'up'}`}></i></button>
                    {showDashboard && <ReservationsDashboard orders={orders} />}
                    <h1>{orders.length} Reservations</h1>
                    <table className="form-table">
                        <tbody>
                            <tr >
                                {thsLabel.map(label =>
                                    <th key={label} className={label}>
                                        {label === 'To do' ? label :
                                            <div className=" flex align-center" onClick={() => onLabel(label)}>
                                                {label}
                                                {sort === label ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                            </div>}
                                    </th>)}
                            </tr>
                            {orders.map(order => {
                                const { _id, buyer, checkIn, checkOut, stay, status, totalPrice } = order
                                if (status === 'negotiations') return
                                return <tr key={_id} >
                                    <td className="buyer Guest flex align-center">
                                        {buyer.imgUrl ? <img src={buyer.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{buyer.fullName[0]}</div>}
                                        <h3>{buyer.fullName}</h3>
                                    </td>
                                    <td className="Check-in"> <p>{utilService.formatDate(checkIn)}</p> </td>
                                    <td className="Check-Out"> <p>{utilService.formatDate(checkOut)}</p> </td>
                                    <td className="name Listing">
                                        {/* <img src={stay.imgUrl} /> */}
                                        <p>{stay.name}</p>
                                    </td>
                                    <td className="Total"> <p>₪{totalPrice}</p> </td>
                                    <td className="Status"> <p className={status}>{status}</p> </td>
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