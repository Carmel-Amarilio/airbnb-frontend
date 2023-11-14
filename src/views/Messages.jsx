import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadOrders, updateOrder } from "../store/actions/order.actions";
import { utilService } from "../services/util.service";
import { orderService } from "../services/order.service";
import logoImgUrl from '../assets/img/logo.png'

export function Messages() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const [currOrder, setCurrOrder] = useState(false)
    const [newMsg, setNewMsg] = useState('')

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            _loadOrders()
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
            updateOrder({ ...currOrder, msgs: newMsgs })
            _loadOrders()
        } catch (error) {
            console.log("Had issues send the msg", error);
        }
        setNewMsg('')
    }

    console.log(currOrder);
    return (
        <section className="messages">
            <StayHeader isUserPage={true} />
            <main>
                <section className="orders sec">
                    <h3> Reservations</h3>
                    <section className="orders-list">
                        {orders.map(order => {
                            const { _id, host, buyer, msgs, status, checkIn, checkOut } = order
                            const chatWith = loggedinUser._id === host._id ? buyer : host
                            return <article key={_id} className="orders-prev flex" onClick={() => getOrder(_id)}>
                                {chatWith.imgUrl ? <img src={chatWith.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{chatWith.fullName[0]}</div>}
                                <div>
                                    <h4>{chatWith.fullName}</h4>
                                    <p>{status}  • {new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                </div>
                            </article>
                        }
                        )}
                    </section>

                </section>

                <section className="messages-txt sec">
                    <h3>Messages</h3>
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

                <section className="details sec">
                    <h3>Details</h3>
                    {currOrder && <article className="flex column" >
                        <img src={currOrder.stay.imgUrl} />
                        <h4>{currOrder.stay.name}</h4>
                        {/* <p>Hosted by {currOrder.stay.}</p> */}
                        <div className="flex space-between align-center">
                            <div>
                                <h5>Check-in:</h5>
                                <p>{utilService.formatDate(currOrder.checkIn)}</p>
                            </div>
                            <div>
                                <h5>Check-out:</h5>
                                <p>{utilService.formatDate(currOrder.checkOut)}</p>
                            </div>
                        </div>
                        <div className="flex space-between align-center">
                            <h5>Guests: </h5>
                            <p>{`${currOrder.guests.adults && `adults: ${currOrder.guests.adults}`}${currOrder.guests.children && `, children: ${currOrder.guests.children}`}${currOrder.guests.infants && `, infants: ${currOrder.guests.infants}`}`}</p>
                        </div>
                        <h5 className="total"><span>Total price:</span> ₪{currOrder.totalPrice}</h5>
                    </article>}
                </section>
            </main>
        </section>
    )
}