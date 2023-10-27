import imgUrl from '../assets/img/logo.png'
import SearchIcon from '@mui/icons-material/Search';

export function StayHeader() {
    return (
        <header className="stay-header main-container full" >
            <section className="flex align-center space-between">
                <section className='logo flex align-center'>
                    <img src={imgUrl} />
                    <span>aircnc</span>
                </section>

                <section className='set-stay flex align-center'>
                    <article>
                        <button>Anywhere</button>
                        <button>Any week</button>
                        <button>Add guests</button>
                    </article>
                    <div className='search-icon'><SearchIcon/></div>
                </section>

                <section>
                    <button>Airbnb your home</button>
                </section>
            </section>
        </header>
    )
}