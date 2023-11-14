import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function AddGuestsSec({ guests, maxGuests , setSearchStay, isOrder = false, setOpenModal }) {
    // const [guestsMap, setGuestsMap] = useState(guests)

    const { adults, children, infants } = guests
    return (
        <section className="add-guests sec">
            <article className="flex align-center space-between">
                <div>
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </div>
                <div className="counter-container flex align-center">
                    <button disabled={adults <= 0 } className='remove icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, adults: adults - 1 } }))}>< RemoveIcon /></button>
                    <p className='counter'>{adults}</p>
                    <button disabled={adults + children >= maxGuests} className='add icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, adults: adults + 1 } }))}>< AddIcon /></button>

                </div>
            </article>
            <article className="flex align-center space-between">
                <div>
                    <h3>Children</h3>
                    <p>Ages 2–12</p>
                </div>
                <div className="counter-container flex align-center">
                    <button disabled={children <= 0} className='remove icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, children: children - 1 } }))}>< RemoveIcon /></button>
                    <p className='counter'>{children}</p>
                    <button disabled={adults + children >= maxGuests} className='add icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, children: children + 1 } }))}>< AddIcon /></button>

                </div>
            </article>
            <article className="flex align-center space-between">
                <div>
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </div>
                <div className="counter-container flex align-center">
                    <button disabled={infants <= 0} className='remove icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, infants: infants - 1 } }))}>< RemoveIcon /></button>
                    <p className='counter'>{infants}</p>
                    <button className='add icon' onClick={() => setSearchStay(prev => ({ ...prev, guests: { ...guests, infants: infants + 1 } }))}>< AddIcon /></button>

                </div>
            </article>

            {isOrder && <div className='flex justify-end'>
                <button onClick={() => setOpenModal('')} className="underline-btn flex">Close</button>
            </div>}
        </section>
    )
}