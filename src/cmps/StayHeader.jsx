import imgUrl from '../assets/img/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useState } from 'react';
import { SingInUp } from './SingInUp';

export function StayHeader() {
    const [isModal, setIsModal] = useState(false)
    const [isLog, setIsLog] = useState(false)

    function toggleModal() {
        setIsModal(!isModal)
    }

    function closeLog() {
        setIsLog(false)
    }

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
                    <div className='search-icon'><SearchIcon /></div>
                </section>

                <section className='sating flex align-center' onClick={toggleModal}>
                    <button className='your-home'>Airbnb your home</button>

                    <LanguageSharpIcon />

                    <article className='user-log flex align-center'>
                        <MenuSharpIcon className='menu-icon' />
                        <AccountCircleSharpIcon className='user-icon' />
                    </article>

                    {isModal && <article className='log-modal flex column'>
                        <button onClick={() => setIsLog("in")}>Log in</button>
                        <button onClick={() => setIsLog("up")}>Sing up</button>
                    </article>}
                </section>

                {isLog && <SingInUp operation={isLog} closeLog={closeLog} />}
            </section>
        </header>
    )
}