import { useState } from "react"
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

export function AllStayImgs({ imgUrls, setAllImgPage }) {
    const [imagesLoaded, setImagesLoaded] = useState(Array(imgUrls.length).fill(false))

    function handleImageLoad(index) {
        setImagesLoaded(prev => {
            prev[index] = true
            return [...prev]
        })
    }

    return (
        <section className="all-stay-imgs">
            <header>
                <button onClick={() => setAllImgPage(false)} className="back-btn"> <KeyboardArrowLeftSharpIcon /> </button>
            </header>
            <article className="images-container" onClick={() => setAllImgPage(true)}>
                {imgUrls.map((img, i) =>
                    <img
                        key={i}
                        src={img}
                        className={`${imagesLoaded[i] ? '' : 'loading'}`}
                        onLoad={() => handleImageLoad(i)}
                        alt={`Stay Image ${i + 1}`} />
                )}
            </article>
        </section>
    )
}