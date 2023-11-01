import StarIcon from '@mui/icons-material/Star';

export function Reviews({ reviews, rating, ratingName }) {


    return (
        <section className="reviews ">
            <h2 className='flex align-center'>
                <StarIcon className="star-icon"/>
                <span> {rating.value} · {reviews.length} reviews</span>
            </h2>

            <section className='rate'>
                {ratingName.map((rateName, i) =>
                    <>
                        <p>{rateName} </p>
                        <div className='flex align-center' key={i}>
                            <div className='bar' style={{ background: `linear-gradient(to right, black ${rating[rateName] / 5 * 100}%, lightgray ${5 - rating[rateName] / 5 * 100}%)` }}></div>
                            <h5>{Math.floor(rating[rateName] * 10) / 10}</h5>
                        </div>
                    </>
                )}
            </section>

            <section className='reviews-container'>
                {reviews.map(review => {
                    const { by, txt } = review
                    return <article className='review'>
                        <header className='flex  align-center'>
                            <img src={by.imgUrl} className="profile" />
                            <div>
                                <h2>{by.fullname}</h2>
                                <p>September 2023</p>
                            </div>
                        </header>
                        <div>{txt}</div>
                    </article>
                })}

            </section>

        </section>
    )
}