import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { stayOptions } from "../assets/img/stayOptions-img"
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';

export function StayFilter({ filter }) {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [chunkStartIndex, setChunkStartIndex] = useState(0);
    const labels = Object.keys(stayOptions);
    const imgs = Object.values(stayOptions);

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);

        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth)
    }

    function setFilter(label) {
        const { destinations, checkIn, checkOut, guests } = filter
        const { adults, children, infants } = guests
        navigate(`/stay?${label ? `label=${label}` : ''}${destinations ? `&destinations=${destinations}` : ''}${checkIn ? `&checkIn=${checkIn}` : ''}${checkOut ? `&checkOut=${checkOut}` : ''}${adults ? `&adults=${adults}` : ''}${children ? `&children=${children}` : ''}${infants ? `&infants=${infants}` : ''}`);
    }
    const layOutPadding = screenWidth > 900 ? 220 : 120
    const chunkSize = Math.floor((screenWidth - layOutPadding) / 117)

    function handleNextChunk() {
        const numberOfOptions = Object.keys(stayOptions).length;
        const nextChunkStart = chunkStartIndex + chunkSize;
        if (nextChunkStart < numberOfOptions) {
            setChunkStartIndex(nextChunkStart)
        }
    }

    function handlePreviousChunk() {
        const previousChunkStart = chunkStartIndex - chunkSize;
        if (previousChunkStart >= 0) {
            setChunkStartIndex(previousChunkStart)
        } else setChunkStartIndex(0)
    }

    return (
        <section className="stay-filter main-container">
            <article className="flex full ">
                {labels.slice(chunkStartIndex, chunkStartIndex + chunkSize).map((label, i) =>
                    <div
                        key={i}
                        className={`label-box ${label === filter.label ? "selected-box" : ""} ${label} flex column justify-center align-center`}
                        onClick={() => setFilter(label)}>
                        <img src={imgs[Math.floor(chunkStartIndex) + i]} />
                        <p>{label}</p>
                    </div>
                )}
                <button disabled={chunkStartIndex <= 0} className="arrow-cont left" onClick={handlePreviousChunk}>
                    <KeyboardArrowLeftSharpIcon className="arrow" />
                </button>
                <button disabled={Object.keys(stayOptions).length <= chunkStartIndex + chunkSize} className="arrow-cont right" onClick={handleNextChunk}>
                    <KeyboardArrowRightSharpIcon className="arrow" />
                </button>
            </article>
        </section>
    );
}
