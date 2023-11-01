import { amenitiesIcon } from "../assets/img/amenities-icon";
import { DatePicker } from "../cmps/DatePicker";

export function StayReviewDetail({currStay}) {

    const {  type, host, summary, amenities} = currStay
    return (
        <section className="stay-review-detail">
            <article className="host flex space-between">
                <div>
                    <h2>{type} by {host.fullname}</h2>
                    <p>2 guests • 1 bedroom • 2 beds • 1 bath</p>
                </div>
                <img src={host.imgUrl} className="profile"/>
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
                        <h3>Free cancellation before Oct 31</h3>
                    </div>
                </article>
            </article>

            <article className="summary">
                <p>{summary}</p>
            </article>

            <article className="amenities">
                <h2>What this place offers</h2>
                {amenities.map((ameniti, i) =>
                    <div key={i} >
                        <img src={amenitiesIcon[ameniti]} />
                        <p>{ameniti}</p>
                    </div>
                )}
                <button className="form-btn">
                    <h3>{`Show all ${amenities.length} amenities`}</h3>
                </button>
            </article>

            <article>
                <h2>Select check-in date</h2>
                <p>Add your travel dates for exact pricing</p>
                <DatePicker />
            </article>
        </section>
    )
}