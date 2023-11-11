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
import { addOrder } from "../store/actions/order.actions";

export function OrderStay() {
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const params = useParams()
    const navigate = useNavigate()
    const [currStay, setCurrStay] = useState(null)
    const [order, setOrder] = useState({})
    const [operation, setOperation] = useState("in")
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const { stayId, checkIn, checkOut, adults, children, infants, rating, reviews } = params
        setOrder({ checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests: { adults: +adults, children: +children, infants: +infants }, rating, reviews })
        getStay(stayId)
            .catch((err) => {
                console.log(err)
            })
    }, [])

    async function getStay(stayId) {
        try {
            const stay = await stayService.get(stayId)
            if (!stay) return navigate("/stay");
            setCurrStay(stay);
        } catch (error) {
            console.log("Had issues loading stay", error);
        }
    }

    async function newOrder() {
        const order = {
            hostId: host._id,
            buyer: loggedinUser,
            totalPrice: (price * calculateNights() + Math.floor((price * calculateNights()) * 0.14) + 30 * calculateNights()),
            checkIn,
            checkOut,
            guests: {
                adults: guests.adults + guests.children + guests.infants,
                children: guests.children,
                infants: guests.infants
            },
            stay: {
                _id,
                name,
                price
            },
            msgs: [],
            status: "pending"
        }

        try {
            addOrder(order)
        } catch (error) {
            console.log("Had issues create a order", error);
        }
    }

    const { checkIn, checkOut, guests, rating, reviews } = order
    function calculateNights() {
        if (!checkIn || !checkOut) return
        const timeDifference = checkOut.getTime() - checkIn.getTime()
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }
    if (!currStay || currStay.length === 0) return (<div>loading...</div>)
    const { _id, imgUrls, name, host, price } = currStay
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
                                <span>{rating}</span>
                                <p> · {reviews} reviews</p>
                            </div>
                        </div>
                    </header>

                    <article className="total-container flex column">
                        <h3>Price details</h3>
                        <div className="flex space-between align-center">
                            <p>₪{price} x {calculateNights()} nights</p>
                            <p>₪{price * calculateNights()}</p>
                        </div>
                        <div className="flex space-between align-center">
                            <p>Cleaning fee</p>
                            <p>₪{Math.floor((price * calculateNights()) * 0.14)}</p>
                        </div>
                        <div className="flex space-between align-center">
                            <p>Airbnb service fee</p>
                            <p>₪{30 * calculateNights()}</p>
                        </div>
                        <div className="total flex space-between align-center">
                            <h3>Total</h3>
                            <p>₪{price * calculateNights() + Math.floor((price * calculateNights()) * 0.14) + 30 * calculateNights()}</p>
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

            {openModal === 'who' && < AddGuestsSec guests={guests} setSearchStay={setOrder} isOrder={true} setOpenModal={setOpenModal} />}
        </section>
    )
}