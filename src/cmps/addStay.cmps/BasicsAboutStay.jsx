import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function BasicsAboutStay({ capacity, setStay }) {
    const { guests, bedrooms, beds, bathrooms } = capacity

    function setCapacity(key, inc) {
        const val = capacity[key] + inc
        if (val < 1) return
        const newCapacity = { ...capacity, [key]: val }
        setStay("capacity", newCapacity)
    }

    return (
        <section className="basics-about-stay">
            <h3>Share some basics about your place</h3>
            <p>You'll add more details later</p>

            <section className='form-container'>
                <article className="flex align-center space-between">
                    <div>
                        <p>Guests</p>
                    </div>
                    <div className="counter-container flex align-center">
                        <button className={`remove icon ${guests < 2 ? "disabled" : ""}`} onClick={() => setCapacity("guests", -1)}>< RemoveIcon /></button>
                        <p className='counter'>{guests}</p>
                        <button className='add icon' onClick={() => setCapacity("guests", 1)}>< AddIcon /></button>

                    </div>
                </article>
                <article className="flex align-center space-between">
                    <div>
                        <p>Bedrooms</p>
                    </div>
                    <div className="counter-container flex align-center">
                        <button className={`remove icon ${bedrooms < 2 ? "disabled" : ""}`} onClick={() => setCapacity("bedrooms", -1)}>< RemoveIcon /></button>
                        <p className='counter'>{bedrooms}</p>
                        <button className='add icon' onClick={() => setCapacity("bedrooms", 1)}>< AddIcon /></button>

                    </div>
                </article>
                <article className="flex align-center space-between">
                    <div>
                        <p>Beds</p>
                    </div>
                    <div className="counter-container flex align-center">
                        <button className={`remove icon ${beds < 2 ? "disabled" : ""}`} onClick={() => setCapacity("beds", -1)}>< RemoveIcon /></button>
                        <p className='counter'>{beds}</p>
                        <button className='add icon' onClick={() => setCapacity("beds", 1)}>< AddIcon /></button>

                    </div>
                </article>
                <article className="flex align-center space-between">
                    <div>
                        <p>Bathrooms</p>
                    </div>
                    <div className="counter-container flex align-center">
                        <button className={`remove icon ${bathrooms < 1.5 ? "disabled" : ""}`} onClick={() => setCapacity("bathrooms", -0.5)}>< RemoveIcon /></button>
                        <p className='counter'>{bathrooms}</p>
                        <button className='add icon' onClick={() => setCapacity("bathrooms", 0.5)}>< AddIcon /></button>

                    </div>
                </article>
            </section>

        </section>
    )
}

//onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, adults: adults - 1 } }))}