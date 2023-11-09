import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { stayService } from "../services/stay.service";

import { StayHeader } from "../cmps/StayHeader";
import { Reviews } from "../cmps/reviews";
import { StayReviewDetail } from "../cmps/StayReviewDetail";
import { OrderForm } from "../cmps/OrderForm";
import { StayMap } from "../cmps/StayMap";
import { HostStay } from "../cmps/HostStay";

import StarIcon from '@mui/icons-material/Star';

export function StayDetails() {
    const [searchStay, setSearchStay] = useState({ checkIn: null, checkOut: null, guests: { adults: 0, children: 0, infants: 0 } })
    const params = useParams()
    const navigate = useNavigate()
    const [currStay, setCurrStay] = useState(null)
    const rating = {}
    const ratingName = [] //["Cleanliness", "Accuracy","Communication","Location","Check-in","Value" ]
    const { checkIn, checkOut } = searchStay


    useEffect(() => {
        const { stayId } = params
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
            console.log("Had issues loading stay");
        }
    }


    function mapRating() {
        reviews.map(review => {
            for (const key in review.rate) {
                if (review.rate.hasOwnProperty(key)) {
                    if (!ratingName.includes(key)) ratingName.push(key)
                    if (rating[key]) rating[key] += review.rate[key]
                    else rating[key] = review.rate[key]
                }
            }
        })
        for (const key in rating) {
            if (rating.hasOwnProperty(key)) rating[key] = rating[key] / reviews.length;
        }
    }


    if (!currStay || currStay.length === 0) return (<div>loading...</div>)
    const { imgUrls, name, type, host, summary, amenities, price, capacity, reviews, labels, loc } = currStay
    mapRating()
    console.log(currStay);
    return (
        <section className="stay-details main-container">
            <StayHeader isDetails={true} />
            <header>
                <h1>{name}</h1>
                <p className='flex align-center'>
                    <StarIcon className="star-icon" />
                    <span> {rating.value} · {reviews.length} reviews · {loc.city}, {loc.country}</span>
                </p>
            </header>

            <article className="image-container">
                {Array.from({ length: 5 }).map((_, i) =>
                    <img key={i} src={imgUrls[i]} />
                )}
            </article>

            <main>
                <StayReviewDetail currStay={currStay} setDates={setSearchStay} checkIn={checkIn} checkOut={checkOut} />
                <OrderForm searchStay={searchStay} setSearchStay={setSearchStay} currStay={currStay} rating={rating.value} reviews={reviews.length} />
            </main>

            <Reviews reviews={reviews} rating={rating} ratingName={ratingName} />
            <article className="map-sec">
                <h2>Where you’ll be</h2>
                <StayMap loc={loc} />
                <h3>{loc.address}, {loc.city}, {loc.country}</h3>
                <p>Very quiet and pleasant neighborhood</p>
            </article>
            <HostStay currStay={currStay} />

        </section>
    )
}