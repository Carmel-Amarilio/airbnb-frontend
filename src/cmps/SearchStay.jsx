import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { WhereSec } from './WhereSec';
import { CheckInOutSec } from './CheckInOutSec';
import { AddGuestsSec } from './AddGuestsSec';
import { useNavigate } from 'react-router';

export function SearchStay({ setIsSetStay, filter, setFilter }) {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false)

    function handleSearch({ target }) {
        let val = target.value
        setFilter((prev) => ({ ...prev, destinations: val }))
    }

    function onSearch() {
        setIsSetStay(false)
        navigate(`/stay?${label ? `label=${label}` : ''}${destinations ? `&destinations=${destinations}` : ''}${checkIn ? `&checkIn=${checkIn}` : ''}${checkOut ? `&checkOut=${checkOut}` : ''}${adults ? `&adults=${adults}` : ''}${children ? `&children=${children}` : ''}${infants ? `&infants=${infants}` : ''}`);
    }

    function openSec(sec) {
        sec === openModal ? setOpenModal(false) : setOpenModal(sec)
    }

    const { label, destinations, checkIn, checkOut, guests } = filter
    const { adults, children, infants } = guests
    return (
        <section className="search-stay">
            <section className='set-stay flex align-center'>
                <article className='set-stay-container flex align-center'>
                    <button className={`flex column btn ${openModal === 'where' ? "selected" : ""}`} onClick={() => openSec('where')}>
                        <h5>Where</h5>
                        <input onChange={handleSearch} value={destinations} type="text" placeholder="Search destinations" />
                    </button>
                    {openModal === 'where' && <  WhereSec setSearchStay={setFilter} />}
                    <button className={`flex column btn ${openModal === 'checkIn' ? "selected" : ""}`} onClick={() => openSec('checkIn')}>
                        <h5>Check in</h5>
                        <p>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                    </button>
                    {(openModal === 'checkIn' || openModal === 'checkOut') && < CheckInOutSec setSearchStay={setFilter} checkIn={checkIn} checkOut={checkOut} />}
                    <button className={`flex column btn check-out ${openModal === 'checkOut' ? "selected" : ""}`} onClick={() => openSec('checkOut')}>
                        <h5>Check out</h5>
                        <p>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "Add dates"}</p>
                    </button>
                    <button className={`guests flex align-center btn ${openModal === 'Who' ? "selected" : ""}`} onClick={() => openSec('Who')}>
                        <div className='flex column'>
                            <h5>Who</h5>
                            {(adults + children + infants === 0) ? <p> Add guests</p> : <p>{`${adults + children + infants} guests`}</p>}
                        </div>
                        <div className='action-btn flex align-center justify-center' onClick={onSearch}><SearchIcon /> Search</div>
                    </button>
                    {openModal === 'Who' && < AddGuestsSec guests={guests} maxGuests={50} setSearchStay={setFilter} />}


                    {(openModal === 'checkIn' || openModal === 'checkOut') && < CheckInOutSec setSearchStay={setFilter} checkIn={checkIn} checkOut={checkOut} />}

                </article>
                <div className='black-space' onClick={() => setIsSetStay(false)}></div>
            </section>
        </section >
    )
}