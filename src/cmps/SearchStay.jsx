import SearchIcon from '@mui/icons-material/Search';

export function SearchStay({setIsSetStay}) {
    return (
        <section className="search-stay">
            <section className='set-stay flex align-center'>
                <article className='flex align-center'>
                    <button className='flex column '>
                        <h5>Where</h5>
                        <input type="text" placeholder="Search destinations" />
                    </button>
                    <button className='flex column'>
                        <h5>Check in</h5>
                        <p>Add dates</p>
                    </button>
                    <button className='flex column'>
                        <h5>Check out</h5>
                        <p>Add dates</p>
                    </button>
                    <button className='guests flex align-center'>
                        <div className='flex column'>
                            <h5>Who</h5>
                            <p>Add guests</p>
                        </div>
                        <button className='search-icon action-btn flex align-center justify-center'><SearchIcon /> Search</button>
                    </button>
                </article>
                <div className='black-space' onClick={()=>setIsSetStay(false)}></div>
            </section>
        </section>
    )
}