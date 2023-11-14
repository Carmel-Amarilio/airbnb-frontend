export function AddStayFooter({ incStep, step, stepCount, isNext }) {

    return (
        <section className="add-stay-footer main-container full">

            <article className="line full flex">
                {Array.from({ length: stepCount }, (_, i) =>
                    <div key={i} className={`step-line ${step >= i + 1 ? "dan" : ""}`}></div>
                )}
            </article>

            <article className="flex align-center space-between">
                <button disabled={step <=1} className="underline-btn" onClick={() => incStep(-1)}>Back</button>
                <button disabled={!isNext} className="black-btn" onClick={() => incStep(1)}>Next</button>
            </article>
        </section>
    )
}