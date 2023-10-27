import { useState } from "react";
import { filters } from "../assets/img/filter-img"

export function StayFilter() {
    const [selectedFilter, setSelectedFilter] = useState(0)
    return (
        <section className="stay-filter flex full">
            {filters.map((item, i) => (
                <div
                    key={i}
                    className={`links-box ${i === selectedFilter? "selected-box":""} flex column justify-center align-center`}
                    onClick={() => {
                        setSelectedFilter(i);
                    }}
                >
                    <img src={item.imgSrc} className="links-img" />
                    <p
                        className={`links-label ${i == selectedFilter && "selected-label"}`}
                    >
                        {item.label}
                    </p>
                </div>
            ))}
        </section>
    )
}