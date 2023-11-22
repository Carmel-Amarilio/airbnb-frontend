import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { StayHeader } from "../cmps/StayHeader";
import { stayService } from "../services/stay.service";
import { orderService } from "../services/order.service";
import { StayImgHeader } from "../cmps/StayImgHeader";
import { utilService } from "../services/util.service";
import { Reviews } from "../cmps/reviews";
import { ActionBtn } from "../cmps/ActionBtn";
import { updateStay } from "../store/actions/stay.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function ReviewStay() {
    const params = useParams()
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [currStay, setCurrStay] = useState(null)
    const [newReview, setNewReview] = useState({ txt: "", rate: { cleanliness: 5, communication: 5, "check-in": 5, accuracy: 5, location: 5, value: 5 } })

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            const { stayId, orderId } = params
            getStay(stayId)
            getOrder(orderId)
        }
    }, [loggedinUser])

    async function getStay(stayId) {
        try {
            const stay = await stayService.get(stayId)
            if (!stay) return navigate("/stay")
            setCurrStay(stay)
        } catch (error) {
            console.log("Had issues loading stay", error);
        }
    }

    async function getOrder(orderId) {
        try {
            const order = await orderService.get(orderId)
            if (!order || order.buyer._id != loggedinUser._id || !isPastDate(order.checkIn)) {
                showErrorMsg('You do not have permissions')
                return navigate("/stay")
            }
        } catch (error) {
            console.log("Had issues loading order", error);
        }
    }

    function isPastDate(date) {
        return new Date(date) < new Date()
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate)
        const options = { day: '2-digit', month: 'long', year: 'numeric' }
        return date.toLocaleDateString(undefined, options)
    }

    function handleChange({ target }, key, key2) {
        let val = target.value
        if (key2) setNewReview(prev => ({ ...prev, rate: { ...prev.rate, [key2]: +val } }))
        else setNewReview(prev => ({ ...prev, [key]: val }))
    }

    function onPost() {
        if(!newReview.txt) return showErrorMsg('Add text')
        const stayToUpdate = currStay
        stayToUpdate.reviews.unshift({ ...newReview, by: loggedinUser, at: new Date() })
        updateStay(stayToUpdate)
        setCurrStay(stayToUpdate)
        setNewReview({ txt: "", rate: { cleanliness: 5, communication: 5, "check-in": 5, accuracy: 5, location: 5, value: 5 } })
        showSuccessMsg('Review uploaded successfully')
    }

    if (!currStay) return (<div>loading...</div>)
    const { reviews } = currStay
    const { rating, ratingName } = utilService.mapRating(reviews)
    return (
        <section className="review-stay main-container">
            <StayHeader isUserPage={true} />
            <main>
                <h1>Reviews</h1>
                <StayImgHeader stay={currStay} rating={rating} />

                <section className="new-review reviews">
                    <h1>Write a review</h1>
                    <article className='rate'>
                        {ratingName.map((rateName, i) =>
                            <div className='flex align-center space-between' key={i}>
                                <p>{rateName} </p>
                                <div className='flex align-center' >
                                    <input type="range" value={newReview.rate[rateName]} min="0" max="5" step=".1" onChange={(ev) => handleChange(ev, 'rate', rateName)} style={{ background: 'black' }} />
                                    <h5>{newReview.rate[rateName]}</h5>
                                </div>
                            </div>
                        )}
                    </article>
                    <article className='review flex column' >
                        <header className='flex align-center'>
                            {loggedinUser.imgUrl ? <img src={loggedinUser.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{loggedinUser.fullName[0]}</div>}
                            <div>
                                <h2>{loggedinUser.fullName}</h2>
                                <p> {formatDate(new Date())}</p>
                            </div>
                        </header>
                        <textarea onChange={(ev) => handleChange(ev, "txt")} type="text" value={newReview.txt} />
                        <ActionBtn line={"Post"} onClick={onPost} />
                    </article>
                </section>

                <Reviews reviews={reviews} rating={rating} ratingName={ratingName} />
            </main>
        </section>
    )
}