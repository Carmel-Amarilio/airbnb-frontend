import { useState } from 'react';
import { AllStayImgs } from './AllStayImgs';
import gridImgUrl from '../assets/img/grid.png'
import StarIcon from '@mui/icons-material/Star';

export function StayImgHeader({ stay, rating }) {
    const { imgUrls, name, reviews, loc } = stay
    const [imagesLoaded, setImagesLoaded] = useState(Array(imgUrls.length).fill(false))
    const [allImgPage, setAllImgPage] = useState(false)

    function handleImageLoad(index) {
        setImagesLoaded(prev => {
            prev[index] = true
            return [...prev]
        })
    }

    return (
        <section className='stay-img-header'>
            <header>
                <h1>{name}</h1>
                <p className='flex align-center'>
                    <StarIcon className="star-icon" />
                    <span> {rating.value ? rating.value.toFixed(2) : 5} · {reviews.length} reviews · {loc.city}, {loc.country}</span>
                </p>
            </header>

            <article className="image-container" onClick={()=> setAllImgPage(true)}>
                {Array.from({ length: 5 }).map((_, i) =>
                    <img
                        key={i}
                        src={imgUrls[i]}
                        className={`${imagesLoaded[i] ? '' : 'loading'}`}
                        onLoad={() => handleImageLoad(i)}
                        alt={`Stay Image ${i + 1}`} />
                )}
                <div className='show-btn form-btn flex align-center'><img src={gridImgUrl} />  Show all photos</div>
            </article>

            {allImgPage&& <AllStayImgs imgUrls={imgUrls} setAllImgPage={setAllImgPage}/>}
        </section>
    )
}