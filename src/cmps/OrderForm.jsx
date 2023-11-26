import { useEffect, useState } from "react";
import { AddGuestsSec } from "./AddGuestsSec";
import { DatePicker } from "./DatePicker";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { ActionBtn } from "./ActionBtn";

export function OrderForm({ searchStay, setSearchStay, currStay, rating, reviews }) {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const { checkIn, checkOut, guests } = searchStay
    const { adults, children, infants } = guests
    const { _id, price, capacity, DateNotAvailable } = currStay

    useEffect(() => {
        if (checkIn && checkOut) setOpenModal('')
    }, [checkIn, checkOut]);


    function calculateNights() {
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }

    function checkAvailability() {
        if (checkIn && checkOut && adults + children + infants > 0) {
            navigate(`/stay/order/${_id}/${checkIn}/${checkOut}/${adults} /${children} /${infants}`)
        } else setOpenModal('checkIn')
    }


    return (
        <section className="order-form">
            <main>
                <header className="flex space-between align-center">
                    <h1>₪{price} <span>night</span></h1>
                    <div className="flex align-center">
                        <StarIcon className="star-icon" />
                        <span>{rating ? rating.toFixed(2) : 5}</span>
                        <p> · {reviews} reviews</p>
                    </div>
                </header>
                <article className="date-order">
                    <article className="btn-date">
                        <button className="btn" onClick={() => setOpenModal('checkIn')}>
                            <h5>CHECK-IN</h5>
                            <p>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                        </button>
                        <button onClick={() => setOpenModal('checkOut')}>
                            <h5>CHECK-OUT</h5>
                            <p>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                        </button>
                    </article>
                    <button onClick={() => setOpenModal('Who')}>
                        <h5>GUESTS</h5>
                        <p>{adults + children + infants > 0 ? adults + children + infants : capacity.guests} guests</p>
                    </button>

                    {(openModal === 'checkIn' || openModal === 'checkOut') && <section className="pic-date sec">
                        <h2>Select dates</h2>
                        <p>Minimum stay: {2} nights</p>
                        <DatePicker setDates={setSearchStay} checkIn={checkIn} checkOut={checkOut} DateNotAvailable={DateNotAvailable} />
                        <article className="clears flex">
                            <button onClick={() => setSearchStay(prev => ({ ...prev, checkIn: null, checkOut: null }))} className="underline-btn">Clear data</button>
                            <button onClick={() => setOpenModal('')} className="black-btn">Close</button>
                        </article>
                    </section>}
                    {openModal === 'Who' && < AddGuestsSec guests={guests} maxGuests={capacity.guests} setSearchStay={setSearchStay} isOrder={true} setOpenModal={setOpenModal} />}
                </article>

                <ActionBtn line={"Check availability"} onClick={checkAvailability} />

                {checkIn && checkOut && <article className="total-container flex column">
                    <p>You won't be charged yet</p>
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
                </article>}

            </main>
            <footer className="stay-details-footer main-container">
                <article className="flex space-between align-center">
                    <div >
                        <p>₪{price} <span>night</span></p>
                        <p>
                            {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"} -
                            {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}
                        </p>
                    </div>

                    <ActionBtn line={"Check availability"} onClick={checkAvailability} />
                </article>
            </footer>
        </section>
    )
}