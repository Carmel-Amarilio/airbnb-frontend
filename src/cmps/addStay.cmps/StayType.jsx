import { useEffect } from "react";
import { stayOptions } from "../../assets/img/stayOptions-img"

export function StayType({ type, setStay, setIsNext }) {

    useEffect(() => {
        setIsNext(true)
    }, [type])

    return (
        <section className="stay-type">
            <h3>What type of place will guests have?</h3>
            <article className={`flex space-between  ${'An entire place' === type ? "select" : ""}`}  onClick={() => setStay("type", 'An entire place')}>
                <div>
                    <h4>An entire place</h4>
                    <p>Guests have the whole place to themselves.</p>
                </div>
                <img src="https://res.cloudinary.com/du1jrse2t/image/upload/v1700670248/entire-place.6cf39f33c4dd9db032c0_mfubbg.svg" />
            </article>
            <article className={`flex space-between  ${'A private room' === type ? "select" : ""}`}  onClick={() => setStay("type", 'A private room')}>
                <div>
                    <h4>A private room</h4>
                    <p>Guests sleep in a private room but some areas may be shared with you and others.</p>
                </div>
                <img src="https://res.cloudinary.com/du1jrse2t/image/upload/v1700670252/private-room.f88bf662caa3200d9e74_qykshq.svg" />
            </article>
            <article className={`flex space-between  ${'A shared room' === type ? "select" : ""}`}  onClick={() => setStay("type", 'A shared room')}>
                <div>
                    <h4>A shared room</h4>
                    <p>Guests sleep in a room or common area that may be shared with you and others.</p>
                </div>
                <img src="https://res.cloudinary.com/du1jrse2t/image/upload/v1700670250/shared-room.c17119802f1d459c1a43_egbyhg.svg" />
            </article>
        </section>
    )
}