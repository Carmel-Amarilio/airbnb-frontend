import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { WhereSec } from './WhereSec';
import { CheckInOutSec } from './CheckInOutSec';
import { AddGuestsSec } from './AddGuestsSec';

export function SearchStay({ setIsSetStay }) {
    const [openModal, setOpenModal] = useState(false)
    const [searchStay, setSearchStay] = useState({ destinations: "", checkIn: null, checkOut: null, guests: { adults: 0, children: 0, infants: 0 } })

    function handleSearch({ target }) {
        let val = target.value
        setSearchStay((prev) => ({ ...prev, destinations: val }))
    }

    const { destinations, checkIn, checkOut, guests } = searchStay
    const { adults, children, infants } = guests
    return (
        <section className="search-stay">
            <section className='set-stay flex align-center'>
                <article className='set-stay-container flex align-center'>
                    <button className={`flex column btn ${openModal === 'where' ? "selected" : ""}`} onClick={() => setOpenModal('where')}>
                        <h5>Where</h5>
                        <input onChange={handleSearch} value={destinations} type="text" placeholder="Search destinations" />
                    </button>
                    <button className={`flex column btn ${openModal === 'checkIn' ? "selected" : ""}`} onClick={() => setOpenModal('checkIn')}>
                        <h5>Check in</h5>
                        <p>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                    </button>
                    <button className={`flex column btn ${openModal === 'checkOut' ? "selected" : ""}`} onClick={() => setOpenModal('checkOut')}>
                        <h5>Check out</h5>
                        <p>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                    </button>
                    <button className={`guests flex align-center btn ${openModal === 'Who' ? "selected" : ""}`} onClick={() => setOpenModal('Who')}>
                        <div className='flex column'>
                            <h5>Who</h5>
                            {(adults + children + infants === 0) ? <p> Add guests</p> : <p>{`${adults + children + infants} guests`}</p>}
                        </div>
                        <div className='action-btn flex align-center justify-center'><SearchIcon /> Search</div>
                    </button>

                    {openModal === 'where' && <  WhereSec setSearchStay={setSearchStay} />}
                    {(openModal === 'checkIn' || openModal === 'checkOut') && < CheckInOutSec setSearchStay={setSearchStay} checkIn={checkIn} checkOut={checkOut} />}
                    {openModal === 'Who' && < AddGuestsSec guests={guests} maxGuests= {50} setSearchStay={setSearchStay} />}

                </article>
                <div className='black-space' onClick={() => setIsSetStay(false)}></div>
            </section>
        </section >
    )
}