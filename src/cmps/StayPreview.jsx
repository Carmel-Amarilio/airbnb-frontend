import { useState } from "react"
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import { useNavigate } from "react-router";

export function StayPreview({ stay }) {
    const [selectedImg, setSelectedImg] = useState(0)
    const navigate = useNavigate()
    const { imgUrls, name, loc, price } = stay

    function incImg(inc) {
        if (selectedImg <= 0 && inc < 0) return
        if (selectedImg >= imgUrls.length - 1 && inc > 0) return
        setSelectedImg(prev => prev + inc)
    }

    function onStay(stayId) {
        navigate(`/stay/${stayId}`)
    }

    return (
        <section className="stay-prev" onClick={() => onStay(stay._id)}>
            <section className="img-sec">
                <img src={imgUrls[selectedImg]} />
                <article className="img-dots flex">
                    {imgUrls.map((img, i) =>
                        <div className={`dot ${i === selectedImg ? "select" : ""}`} key={i}></div>
                    )}
                </article>
                <article className="img-arrow flex space-between">
                    <KeyboardArrowLeftSharpIcon className={`arrow left ${selectedImg <= 0 ? "hide" : ""} `} onClick={(ev) => { ev.stopPropagation(); incImg(-1)}} />
                    <KeyboardArrowRightSharpIcon className={`arrow right ${selectedImg >= imgUrls.length - 1 ? "hide" : ""} `} onClick={(ev) => { ev.stopPropagation(); incImg(1)}} />
                </article>
            </section>



            <article>
                <p className="name">{name}</p>
                <p className="loc">{loc.city}, {loc.country}</p>
                <p className="price">₪{price} <span>night</span></p>
            </article>
        </section>
    )
}