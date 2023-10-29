import { useEffect, useState } from "react";
import { filters } from "../assets/img/filter-img";
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';

export function StayFilter() {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [chunkStartIndex, setChunkStartIndex] = useState(0);

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);

        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    const chunkSize = (screenWidth - 200) / 130 +1

    function handleNextChunk(){
        const nextChunkStart = chunkStartIndex + chunkSize;
        if (nextChunkStart < filters.length) {
            setChunkStartIndex(nextChunkStart)
        }
    }

    function handlePreviousChunk(){
        const previousChunkStart = chunkStartIndex - chunkSize;
        if (previousChunkStart >= 0) {
            setChunkStartIndex(previousChunkStart)
        }
    }

    return (
        <section className="stay-filter flex full">
            {filters.slice(chunkStartIndex, chunkStartIndex + chunkSize).map((item, i) => {
                return (
                    <div
                        key={i}
                        className={`links-box ${i === selectedFilter ? "selected-box" : ""} flex column justify-center align-center`}
                        onClick={() => setSelectedFilter(chunkStartIndex + i)}
                    >
                        <img src={item.imgSrc} className="links-img" />
                        <p className={`links-label ${i === selectedFilter - chunkStartIndex && "selected-label"}`}>
                            {item.label}
                        </p>
                    </div>
                );
            })}

            <div className="arrow-cont left" onClick={handlePreviousChunk}>
                <KeyboardArrowLeftSharpIcon className="arrow" />
            </div>
            <div className="arrow-cont right" onClick={handleNextChunk}>
                <KeyboardArrowRightSharpIcon className="arrow" />
            </div>
        </section>
    );
}
