import { useEffect } from "react";
import { stayOptions } from "../../assets/img/stayOptions-img"

export function DescribesStay({ type, setStay, setIsNext }) {
    const labels = Object.keys(stayOptions);
    const imgs = Object.values(stayOptions);

    useEffect(() => {
        setIsNext(true)
    }, [type])

    return (
        <section className="describes-stay">
            <h3>Which of these best describes <br></br> your place?</h3>
            <article className="stay-options-container">
                {labels.map((label, i) =>
                    <div
                        key={i}
                        className={`stay-option ${label === type ? "select" : ""}`}
                        onClick={() => setStay("type", label)}>
                        <img src={imgs[i]} />
                        <p>{label}</p>
                    </div>
                )}
            </article>
        </section>
    )
}