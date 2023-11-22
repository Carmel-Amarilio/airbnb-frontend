import { useEffect } from "react";
import { stayOptions } from "../../assets/img/stayOptions-img"

export function DescribesStay({ labels, setStay, setIsNext }) {
    const labelsDb = Object.keys(stayOptions);
    const imgs = Object.values(stayOptions);

    useEffect(() => {
        labels.length > 0 ? setIsNext(true): setIsNext(false)
    }, [labels])
    console.log(labels);
    function setLabels(label) {
        const newLabels = [...labels]
        if (newLabels.includes(label)) newLabels.splice(newLabels.indexOf(label), 1) 
        else newLabels.push(label)
        setStay("labels", newLabels)
    }

    return (
        <section className="describes-stay">
            <h3>Which of these best describes <br></br> your place?</h3>
            <article className="stay-options-container">
                {labelsDb.map((label, i) =>
                    <div
                        key={i}
                        className={`stay-option ${labels.includes(label) ? "select" : ""}`}
                        onClick={() => setLabels(label)}>
                        <img src={imgs[i]} />
                        <p>{label}</p>
                    </div>
                )}
            </article>
        </section>
    )
}