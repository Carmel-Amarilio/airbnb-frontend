import { DatePicker } from "./DatePicker";

export function CheckInOutSec({setSearchStay, checkIn, checkOut}) {
    return (
        <section className="check-in-out sec flex column align-center justify-center">
            <article className="choose-dates flex">
                <p>Choose dates</p>
                <p>Flexible dates</p>
            </article>
            <DatePicker setDates={setSearchStay} checkIn={checkIn} checkOut={checkOut} />
        </section>
    )
}