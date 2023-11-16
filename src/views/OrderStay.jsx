import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service";
import logoImgUrl from '../assets/img/logo.png'
import reservationImgUrl from '../assets/img/reservation.png'
import { useSelector } from "react-redux";
import { ActionBtn } from "../cmps/ActionBtn";
import { SingInUp } from "../cmps/SingInUp";
import StarIcon from '@mui/icons-material/Star';
import { DatePicker } from "../cmps/DatePicker";
import { AddGuestsSec } from "../cmps/AddGuestsSec";
import { addOrder, updateOrder } from "../store/actions/order.actions";
import { orderService } from "../services/order.service";
import { utilService } from "../services/util.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function OrderStay() {
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const params = useParams()
    const navigate = useNavigate()
    const [currStay, setCurrStay] = useState(null)
    const [order, setOrder] = useState({})
    const [operation, setOperation] = useState("in")
    const [openModal, setOpenModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const { checkIn, checkOut, guests } = order
    const nightsCount = checkIn && checkOut ? utilService.calculateNights(checkIn, checkOut) : null

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            const { orderId, stayId, checkIn, checkOut, adults, children, infants } = params
            if (!orderId) {
                setOrder({ checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests: { adults: +adults, children: +children, infants: +infants } })
                getStay(stayId)
            }
            else {
                setIsUpdate(true)
                getOrder(orderId)
            }

        }
    }, [loggedinUser])

    async function getStay(stayId) {
        try {
            const stay = await stayService.get(stayId)
            if (!stay) return navigate("/stay");
            setCurrStay(stay);
        } catch (error) {
            console.log("Had issues loading stay", error)
        }
    }

    async function getOrder(orderId) {
        try {
            const order = await orderService.get(orderId)
            if (!order) return navigate("/messages")
            setOrder(order)
            getStay(order.stay._id)
        } catch (error) {
            console.log("Had issues loading order", error)
        }
    }

    async function newOrder() {
        if (!checkIn || !checkOut ) return showErrorMsg('You have not specified dates for your trip ')
        if (!guests.adults) return showErrorMsg('You did not specify the number of guests ')
        const totalPrice = (price * nightsCount + Math.floor((price * nightsCount) * 0.14) + 30 * nightsCount)
        if (isUpdate) {
            try {
                updateOrder({ ...order, status: 'pending', totalPrice })
                showSuccessMsg('The request has been successfully updated')
                navigate("/trips")
            } catch (error) {
                console.log("Had issues update order", error);
            }

        } else {
            const miniStay = { _id, name, price, imgUrl: imgUrls[0] }
            const newOrder = orderService.getEmptyOrder({ host, loggedinUser, totalPrice, checkIn, checkOut, guests, miniStay, status: 'pending' })
            try {
                addOrder(newOrder)
                showSuccessMsg('booking request sent to host')
                navigate("/trips")
            } catch (error) {
                console.log("Had issues create a order", error);
            }
        }
    }


    if (!currStay || currStay.length === 0) return (<div>loading...</div>)
    const { _id, imgUrls, name, host, price, capacity, reviews } = currStay
    const { rating } = utilService.mapRating(reviews)
    return (
        <section className="order-stay main-container">
            <header className='logo flex align-center' onClick={() => navigate("/stay")}>
                <img src={logoImgUrl} />
                <span>aircnc</span>
            </header>
            <main >
                <section className="request-book">
                    <h1>Request to book</h1>
                    <article className="your-trip flex column">
                        <h3>Your trip</h3>
                        <div className="flex align-center space-between">
                            <div>
                                <h4>Dates</h4>
                                <p>{new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                            </div>
                            <button className="underline-btn" onClick={() => setOpenModal("date")}>Edit</button>
                        </div>
                        <div className="flex align-center space-between">
                            <div>
                                <h4>Guests</h4>
                                <p>{guests.adults + guests.children + guests.infants} guest</p>
                            </div>
                            <button className="underline-btn" onClick={() => setOpenModal("who")}>Edit</button>
                        </div>
                    </article>
                    <article>
                        <h3>Ground rules</h3>
                        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <p>• Follow the house rules</p>
                        <p>• Treat your Host’s home like your own</p>
                    </article>
                    <article className="flex align-center">
                        <img src={reservationImgUrl} />
                        <h4>Your reservation won’t be confirmed until the Host accepts your request (within 24 hours). </h4>
                    </article>
                    {
                        loggedinUser ? <ActionBtn line={"Request to book"} onClick={newOrder} /> : <SingInUp operation={operation} setOperation={setOperation} isOrder={true} />
                    }


                </section>

                <section className="summary-card">
                    <header className="flex">
                        <img src={imgUrls[0]} />
                        <div className="flex column space-between">
                            <div>
                                <p>Entire rental unit</p>
                                <h4>{name}</h4>
                            </div>
                            <div className="flex align-center">
                                <StarIcon className="star-icon" />
                                <span>{rating.value}</span>
                                <p> · {reviews.length} reviews</p>
                            </div>
                        </div>
                    </header>

                    <article className="total-container flex column">
                        <h3>Price details</h3>
                        <div className="flex space-between align-center">
                            <p>₪{price} x {nightsCount} nights</p>
                            <p>₪{price * nightsCount}</p>
                        </div>
                        <div className="flex space-between align-center">
                            <p>Cleaning fee</p>
                            <p>₪{Math.floor((price * nightsCount) * 0.14)}</p>
                        </div>
                        <div className="flex space-between align-center">
                            <p>Airbnb service fee</p>
                            <p>₪{30 * nightsCount}</p>
                        </div>
                        <div className="total flex space-between align-center">
                            <h3>Total</h3>
                            <p>₪{price * nightsCount + Math.floor((price * nightsCount) * 0.14) + 30 * nightsCount}</p>
                        </div>
                    </article>

                </section>
            </main>

            {(openModal === 'date') &&
                <section className="pic-date">
                    <h2>Select dates</h2>
                    <p>Minimum stay: {2} nights</p>
                    <DatePicker setDates={setOrder} checkIn={checkIn} checkOut={checkOut} />
                    <article className="clears flex">
                        <button onClick={() => setOpenModal('')} className="black-btn">Close</button>
                    </article>
                </section>}

            {openModal === 'who' && < AddGuestsSec guests={guests} maxGuests={capacity.guests} setSearchStay={setOrder} isOrder={true} setOpenModal={setOpenModal} />}
        </section>
    )
}