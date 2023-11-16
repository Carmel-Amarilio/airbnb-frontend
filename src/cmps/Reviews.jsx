import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReviewsModal } from './ReviewsModal';

export function Reviews({ reviews, rating, ratingName }) {
    const [showMore, setShowMore] = useState({});
    const [isReviewsModal, setIsReviewsModal] = useState(false);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function cutToWords(text) {
        const words = text.split(/\s+/);
        return words.slice(0, 20).join(' ');
    }

    function toggleShowMore(index) {
        setShowMore((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    }

    return (
        <section className="reviews ">
            <h2 className='flex align-center'>
                <StarIcon className="star-icon" />
                <span> {rating.value ? rating.value.toFixed(2) : 5} · {reviews.length} reviews</span>
            </h2>

            <section className='rate'>
                {ratingName.map((rateName, i) =>
                    <div className='flex align-center space-between' key={i}>
                        <p>{rateName} </p>
                        <div className='flex align-center' >
                            <div className='bar' style={{ background: `linear-gradient(to right, black ${rating[rateName] / 5 * 100}%, lightgray ${5 - rating[rateName] / 5 * 100}%)` }}></div>
                            <h5>{(Math.floor(rating[rateName] * 10) / 10) || 5}</h5>
                        </div>
                    </div>
                )}
            </section>

            <section className='reviews-container'>
                {reviews.slice(0, 6).map((review, i) => {
                    const { by, txt, at } = review;
                    return (
                        <article className='review' key={i}>
                            <header className='flex align-center'>
                                {by.imgUrl ? <img src={by.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{by.fullName[0]}</div>}
                                <div>
                                    <h2>{by.fullName}</h2>
                                    <p>{formatDate(at)}</p>
                                </div>
                            </header>
                            {txt.split(/\s+/).length > 20 ? <div>
                                <p>{showMore[i] ? `${txt} ` : `${cutToWords(txt)} ...`}</p>
                                <button className="underline-btn" onClick={() => toggleShowMore(i)}>
                                    {showMore[i] ? 'Show Less' : 'Show More'}
                                </button>
                            </div> : <div><p>{txt}</p></div>}
                        </article>
                    );
                })}
            </section>

            {reviews.length > 0 && <button className='form-btn' onClick={() => setIsReviewsModal(true)}>Sow all {reviews.length} reviews</button>}
            {isReviewsModal && <ReviewsModal setIsReviewsModal={setIsReviewsModal} reviews={reviews} formatDate={formatDate} />}
        </section>
    );
}
