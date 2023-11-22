import { useEffect } from "react";
import { amenitiesIcon } from "../../assets/img/amenities-icon"

export function HasInStay({ amenities, setStay, setIsNext }) {
    const labels = Object.keys(amenitiesIcon);
    const imgs = Object.values(amenitiesIcon);

    useEffect(() => {
        amenities.length > 0 ? setIsNext(true): setIsNext(false)
    }, [amenities])

    function setAmenities(label) {
        const newAmenities = [...amenities]
        if (newAmenities.includes(label)) newAmenities.splice(newAmenities.indexOf(label), 1)
        else newAmenities.push(label)
        setStay("amenities", newAmenities)
    }

    return (
        <section className="describes-stay">
            <h3>Tell guests what your place has to offer</h3>
            <article className="stay-options-container">
                {labels.map((label, i) =>
                    <div
                        key={i}
                        className={`stay-option ${amenities.includes(label) ? "select" : ""}`}
                        onClick={() => setAmenities(label)}>
                        <img src={imgs[i]} />
                        <p>{label}</p>
                    </div>
                )}
            </article>
        </section>
    )
}