import { useState } from "react";
import { amenitiesIcon } from "../assets/img/amenities-icon";
import { DatePicker } from "../cmps/DatePicker";
import { AmenitiesModal } from "./AmenitiesModal";

export function StayReviewDetail({ currStay, setDates, checkIn, checkOut }) {
    const [isModal, setIsModal] = useState(false)
    const { type, host, summary, capacity, amenities } = currStay
    return (
        <section className="stay-review-detail">
            <article className="host flex space-between">
                <div>
                    <h2>{type} by {host.fullName}</h2>
                    <p>{capacity.guests} guests • {capacity.bedrooms} bedroom • {capacity.beds} beds • {capacity.bathrooms} bath</p>
                </div>
                {(host.imgUrl ?
                    <img src={host.imgUrl} className="profile" />
                    : <div className='no-img flex justify-center align-center'>{host.fullName[0]}</div>)}
            </article>

            <article className="stand-out">
                <article>
                    <img src="https://akebnb-rental-service.onrender.com/static/media/great-location.987825e7db7d944a80ecd659652168cb.svg" />
                    <div>
                        <h3>Great location</h3>
                        <p>100% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </article>
                <article>
                    <img src="https://akebnb-rental-service.onrender.com/static/media/great-checkin.9d292c8ee79525268a466e3755e1ad52.svg" />
                    <div>
                        <h3>Great check-in experiance</h3>
                        <p>100% of recent guests gave the check-in process a 5-star rating.</p>
                    </div>
                </article>
                <article>
                    <img src="https://akebnb-rental-service.onrender.com/static/media/free-cancelation.b79a04108108692db3fc62e4fdb8eadf.svg" />
                    <div>
                        <h3>Free cancellation 3 days before</h3>
                    </div>
                </article>
            </article>

            <article className="summary">
                <p>{summary}</p>
            </article>

            <article className="amenities">
                <h2>What this place offers</h2>
                <div className="amenities-container">
                    {amenities.slice(0, 10).map((ameniti, i) => (
                        <div key={i}>
                            <img src={amenitiesIcon[ameniti]} alt={ameniti} />
                            <p>{ameniti}</p>
                        </div>
                    ))}
                </div>
                <button className="form-btn" onClick={() => setIsModal(true)}>
                    {`Show all ${amenities.length} amenities`}
                </button>
            </article>

            {isModal && <AmenitiesModal setIsModal={setIsModal} amenities={amenities} />}

            <article>
                <h2>Select check-in date</h2>
                <p>Add your travel dates for exact pricing</p>
                <DatePicker setDates={setDates} checkIn={checkIn} checkOut={checkOut} />
            </article>
        </section>
    )
}