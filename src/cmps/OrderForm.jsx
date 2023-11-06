import { useEffect, useState } from "react";
import { AddGuestsSec } from "./AddGuestsSec";
import { DatePicker } from "./DatePicker";
import StarIcon from '@mui/icons-material/Star';

export function OrderForm({ searchStay, setSearchStay, currStay, rating, reviews }) {
    const [openModal, setOpenModal] = useState(false)
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const { checkIn, checkOut, guests } = searchStay
    const { adults, children, infants } = guests
    const { price, capacity } = currStay

    useEffect(() => {
        if (checkIn && checkOut) setOpenModal('')
    }, [checkIn, checkOut]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;

        setMouseX(x);
        setMouseY(y);
    }

    function calculateNights() {
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }

    return (
        <section className="order-form">
            <header className="flex space-between align-center">
                <h1>₪{price} <span>night</span></h1>
                <div className="flex align-center">
                    <StarIcon className="star-icon" />
                    <span>{rating}</span>
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
                    <p>{adults + children + infants > 0 ? adults + children + infants : capacity} guests</p>
                </button>

                {(openModal === 'checkIn' || openModal === 'checkOut') && <section className="pic-date sec">
                    <h2>Select dates</h2>
                    <p>Minimum stay: {2} nights</p>
                    <DatePicker setDates={setSearchStay} checkIn={checkIn} checkOut={checkOut} />
                    <article className="clears flex">
                        <button onClick={() => setSearchStay(prev => ({ ...prev, checkIn: null, checkOut: null }))} className="underline-btn">Clear data</button>
                        <button onClick={() => setOpenModal('')} className="black-btn">Close</button>
                    </article>
                </section>}
                {openModal === 'Who' && < AddGuestsSec guests={guests} setSearchStay={setSearchStay} isOrder={true} setOpenModal={setOpenModal} />}
            </article>

            <button
                className="action-btn"
                onMouseMove={handleMouseMove}
                style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}>
                Check availability
            </button>

            {checkIn && checkOut && <article className="total-container flex column">
                <p>You won't be charged yet</p>
                <div className="flex space-between align-center">
                    <p>₪{price} x {calculateNights()} nights</p>
                    <p>₪{price * calculateNights()}</p>
                </div>
                <div className="flex space-between align-center">
                    <p>Cleaning fee</p>
                    <p>₪{140}</p>
                </div>
                <div className="flex space-between align-center">
                    <p>Airbnb service fee</p>
                    <p>₪{230}</p>
                </div>
                <div className="total flex space-between align-center">
                    <h3>Total</h3>
                    <p>₪{price * calculateNights() + 140 + 230}</p>
                </div>
            </article>}
        </section>
    )
}