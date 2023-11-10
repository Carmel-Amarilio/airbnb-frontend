import { amenitiesIcon } from "../assets/img/amenities-icon";

export function AmenitiesModal({ setIsModal, amenities}) {
    return (
        <section className="modal">
            <button onClick={() => setIsModal(false)}>X</button>

            <article className="amenities-container">
                <h2>What this place offers</h2>
                {amenities.map((ameniti, i) => (
                        <div key={i}>
                           <img src={amenitiesIcon[ameniti]} />
                            <p>{ameniti}</p>
                        </div>
                    ))}
            </article>
            {/* <div className='black-space' onClick={() => setIsModal(false)}></div> */}
        </section>
    )
}