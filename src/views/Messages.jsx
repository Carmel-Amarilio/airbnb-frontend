import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadOrders, updateOrder, updateOrderToMsg } from "../store/actions/order.actions";
import { utilService } from "../services/util.service";
import { orderService } from "../services/order.service";
import { ActionBtn } from "../cmps/ActionBtn";
import logoImgUrl from '../assets/img/logo.png'
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { socketService } from "../services/socket.service";
import { LoaderPage } from "./LoaderPage";

export function Messages() {
    const location = useLocation();
    const navigate = useNavigate();

    const orderId = new URLSearchParams(location.search).get('orderId');
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const [currOrder, setCurrOrder] = useState(false)
    const [newMsg, setNewMsg] = useState('')
    const [secOver, setSecOver] = useState('orders')


    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            _loadOrders()
            if (orderId) getOrder(orderId)

            socketService.on('order-updated', order => {
                _loadOrders()
                if (currOrder._id && currOrder._id === order._id) setCurrOrder(order)
            })
        }
    }, [loggedinUser])

    function _loadOrders() {
        loadOrders({ userId: loggedinUser._id, isMsg: true })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getOrder(orderId) {
        try {
            const order = await orderService.get(orderId)
            if (!order) return navigate("/messages");
            setCurrOrder(order);
        } catch (error) {
            console.log("Had issues loading order", error);
        }
        setSecOver('messages')
    }

    function sendMsg() {
        if (newMsg === "") return
        const newMsgs = currOrder.msgs;
        newMsgs.push({
            id: utilService.makeId(),
            text: newMsg,
            by: loggedinUser
        })
        try {
            updateOrder({ ...currOrder, msgs: newMsgs, lastUpdate: Date.now() })
            _loadOrders()
        } catch (error) {
            console.log("Had issues send the msg", error);
        }
        setNewMsg('')
    }

    async function onOrder() {
        navigate(`/stay/order/${currOrder._id}`)
    }

    function isPastDate(date) {
        return new Date(date) < new Date()
    }

    if (!loggedinUser) navigate("/stay")
    if (!orders) return (<LoaderPage />)
    return (
        <section className="messages">
            <StayHeader isUserPage={true} />
            <main>
                <section className={`orders sec ${secOver === 'orders' ? "over" : ''}`}>
                    <h3> Reservations</h3>
                    {!orders.length ?
                        <section className="empty-page" >
                            <div>
                                <h2>You have no unread messages</h2>
                                <p>When you book a trip or experience, messages from your host will show up here</p>
                                <button className="form-btn" onClick={() => navigate("/stay")}> Explore Aircnc</button>
                            </div>
                        </section> :
                        <section className="orders-list">
                            {orders.map(order => {
                                const { _id, host, buyer, msgs, status, checkIn, checkOut } = order
                                const chatWith = loggedinUser._id === host._id ? buyer : host
                                return <article key={_id} className={`orders-prev flex ${currOrder._id === _id ? 'select' : ''}`} onClick={() => getOrder(_id)}>
                                    {chatWith.imgUrl ? <img src={chatWith.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{chatWith.fullName[0]}</div>}
                                    <div>
                                        <h4>{chatWith.fullName}</h4>
                                        {status != 'negotiations' ? <p>{status}  • {new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p> :
                                            <p>{status} </p>}
                                    </div>
                                </article>
                            }
                            )}
                        </section>}

                </section>

                <section className={`messages-txt sec ${secOver === 'messages' ? "over" : ''}`}>
                    <KeyboardArrowLeftSharpIcon className="nav-btn" onClick={() => setSecOver('orders')} />
                    <h3>Messages</h3>
                    <button className=" underline-btn" onClick={() => setSecOver('details')}>Details</button>
                    {currOrder && <article className="msg-list flex column">
                        {currOrder.msgs.map(msg =>
                            <div className="msg flex" key={msg.id}>
                                {msg.by.imgUrl ? <img src={msg.by.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{msg.by.fullName[0]}</div>}
                                <div>
                                    <h4>{msg.by.fullName}</h4>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        )}
                    </article>}
                    {currOrder && <article className="new-msg flex">
                        <input type="text" value={newMsg} autoComplete="off" onChange={(e) => setNewMsg(e.target.value)} />
                        <img src={logoImgUrl} onClick={sendMsg} />
                    </article>}
                </section>

                <section className={`details sec ${secOver === 'details' ? "over" : ''}`}>
                    <KeyboardArrowLeftSharpIcon className="nav-btn" onClick={() => setSecOver('messages')} />
                    <h3>Details</h3>
                    {currOrder && <article className="flex column" >
                        <img src={currOrder.stay.imgUrl} />
                        <div>
                            <h4>{currOrder.stay.name}</h4>
                            <p>Hosted by {currOrder.host.fullName}</p>
                        </div>
                        {currOrder.status != 'negotiations' && <div className="flex space-between align-center">
                            <div>
                                <h5>Check-in:</h5>
                                <p>{utilService.formatDate(currOrder.checkIn)}</p>
                            </div>
                            <div>
                                <h5>Check-out:</h5>
                                <p>{utilService.formatDate(currOrder.checkOut)}</p>
                            </div>
                        </div>}
                        {currOrder.status != 'negotiations' && <div className="flex space-between align-center">
                            <h5>Guests: </h5>
                            <p>{`${currOrder.guests.adults ? `adults: ${currOrder.guests.adults}` : ''}${currOrder.guests.children ? `, children: ${currOrder.guests.children}` : ''}${currOrder.guests.infants ? `, infants: ${currOrder.guests.infants}` : ''}`}</p>
                        </div>}
                        {currOrder.status != 'negotiations' && <h5 className="total"><span>Total price:</span> ₪{currOrder.totalPrice}</h5>}
                        {currOrder.status != 'negotiations' && loggedinUser._id != currOrder.host._id &&
                            <div>
                                <p>{isPastDate(currOrder.checkIn) ? 'How was your stay? would you like to write review about the place' : 'After your stay you can write review about the place'}</p>
                                <button disabled={!isPastDate(currOrder.checkIn)} onClick={() => navigate(`/stay/review/${currOrder.stay._id}/${currOrder._id}`)} className="form-btn">Write a review</button>
                            </div>}


                        {currOrder.status === 'negotiations' && <ActionBtn line={"Request to book"} onClick={onOrder} />}
                    </article>}
                </section>
            </main>
        </section>
    )
}