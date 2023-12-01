import { useNavigate } from "react-router";
import { StayHeader } from "../cmps/StayHeader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadOrders, removeOrder } from "../store/actions/order.actions";
import { utilService } from "../services/util.service";
import { socketService } from "../services/socket.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { stayService } from "../services/stay.service";
import { updateStay } from "../store/actions/stay.actions";
import { LoaderPage } from "./LoaderPage";

export function Trips() {

    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const [sort, setSort] = useState('lastUpdate')

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            _loadOrders('lastUpdate')

            socketService.on('order-updated', order => {
                console.log('hi updated');
                _loadOrders('lastUpdate')
            })
        }
    }, [loggedinUser])

    useEffect(() => {
        let sortBy = 'lastUpdate'
        switch (sort) {
            case 'host': sortBy = 'host.fullName'; break;
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
        loadOrders({ userId: loggedinUser._id, isGuest: true }, sortBy)
            .catch((err) => {
                console.log(err)
            })
    }

    async function onCancel(order) {
        const { _id, checkIn, checkOut, stay } = order
        try {
            const currStay = await stayService.get(stay._id)
            const newDateNotAvailable = currStay.DateNotAvailable.filter((date) => !(date >= checkIn && date <= checkOut))
            updateStay({ ...currStay, DateNotAvailable: [...newDateNotAvailable] })
            removeOrder(_id)
            _loadOrders()
            showSuccessMsg('Trip been cancel')
        } catch (error) {
            console.log("Had issues cancel the trip", error);
            showErrorMsg("Had issues cancel the trip")
        }
    }

    function onLabel(label) {
        sort === label ? setSort('lastUpdate') : setSort(label)
    }

    function isPastDate(date) {
        const today = new Date()
        return new Date(date) < today
    }

    const thsLabel = ['host', 'Check-in', 'Check-Out', 'Listing', 'Total payout', 'Status', 'Actions']
    if (!orders) return (<LoaderPage />)
    return (
        <section className="trips main-container">
            <StayHeader isUserPage={true} />
            {!orders.length && <section className="empty-page" >
                <h1> Trips</h1>
                <div>
                    <h2>No trips booked...yet!</h2>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button className="form-btn" onClick={() => navigate("/stay")}> Start searching</button>
                </div>
            </section>}
            {!!orders.length && <main >
                <h1>{orders.length} Trips</h1>
                <table className="form-table">
                    <tbody>
                        <tr >
                            {thsLabel.map(label =>
                                <th key={label} className={label}>
                                    {label === 'Actions' ? label :
                                        <div className='flex align-center' onClick={() => onLabel(label)}>
                                            {label}
                                            {sort === label ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                        </div>}
                                </th>)}
                        </tr>
                        {orders.map(order => {
                            const { _id, host, checkIn, checkOut, stay, status, totalPrice } = order
                            if (status === 'negotiations') return
                            return <tr key={_id} >
                                <td className="host flex align-center">
                                    {host.imgUrl ? <img src={host.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{host.fullName[0]}</div>}
                                    <h3>{host.fullName}</h3>
                                </td>
                                <td className="Check-in"> <p>{utilService.formatDate(checkIn)}</p> </td>
                                <td className="Check-Out"> <p>{utilService.formatDate(checkOut)}</p> </td>
                                <td className="Listing"> <p>{stay.name}</p> </td>
                                <td className="Total payout"> <p>₪{totalPrice}</p> </td>
                                <td className="Status"> <p className={status}>{status}</p> </td>
                                <td className="Actions ">
                                    <button disabled={isPastDate(checkIn)} className="form-btn" onClick={() => onCancel(order)}>Cancel trip</button>
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </main>}
        </section >
    )
}