export function AddStayFooter({ incStep, step, stepCount, isNext }) {

    return (
        <section className="add-stay-footer main-container full">

            <article className="line full flex">
                {Array.from({ length: stepCount }, (_, i) =>
                    <div key={i} className={`step-line ${step >= i + 1 ? "dan" : ""}`}></div>
                )}
            </article>

            <article className="flex align-center space-between">
                <button className="underline-btn" onClick={() => incStep(-1)}>Back</button>
                {isNext && <button className="black-btn" onClick={() => incStep(1)}>Next</button>}
                {!isNext && <button className="black-btn next-disabled" >Next</button>}
            </article>
        </section>
    )
}