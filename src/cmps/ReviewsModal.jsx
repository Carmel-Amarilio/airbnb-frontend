export function ReviewsModal({ setIsReviewsModal, reviews, formatDate }) {
    return (
        <section className="reviews-modal modal ">
            <button onClick={() => setIsReviewsModal(false)}>X</button>
            <section className='container flex column'>
                {reviews.map((review, i) => {
                    const { by, txt, at } = review;
                    return (
                        <article className='review-in-modal' key={i}>
                            <header className='flex align-center'>
                                {by.imgUrl ? <img src={by.imgUrl} className="profile" /> : <div className='no-img flex justify-center align-center'>{by.fullName[0]}</div>}
                                <div>
                                    <h2>{by.fullName}</h2>
                                    <p>{formatDate(at)}</p>
                                </div>
                            </header>
                            <div>
                                <p>{txt}</p>
                            </div>
                        </article>
                    );
                })}
            </section>

        </section>
    )
}