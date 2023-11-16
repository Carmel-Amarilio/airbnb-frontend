import StarIcon from '@mui/icons-material/Star';

export function StayImgHeader({ stay, rating }) {
    const { imgUrls, name, reviews, loc } = stay
    return (
        <section className='stay-img-header'>
            <header>
                <h1>{name}</h1>
                <p className='flex align-center'>
                    <StarIcon className="star-icon" />
                    <span> {rating.value ? rating.value.toFixed(2) : 5} · {reviews.length} reviews · {loc.city}, {loc.country}</span>
                </p>
            </header>

            <article className="image-container">
                {Array.from({ length: 5 }).map((_, i) =>
                    <img key={i} src={imgUrls[i]} />
                )}
            </article>
        </section>
    )
}