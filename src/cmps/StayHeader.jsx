import imgUrl from '../assets/img/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useState } from 'react';
import { SingInUp } from './SingInUp';
import { SearchStay } from './SearchStay';
import { useSelector } from 'react-redux';
import { logout } from '../store/actions/user.actions';

export function StayHeader({ isDetails = false }) {
    const logInUser = useSelector((storeState) => storeState.userModule.user)
    const [isModal, setIsModal] = useState(false)
    const [isLog, setIsLog] = useState(false)
    const [isSetStay, setIsSetStay] = useState(false)

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

                <section className='set-stay-btn flex align-center'>
                    <article onClick={() => setIsSetStay(true)}>
                        {!isDetails && <button>Anywhere</button>}
                        {!isDetails && <button>Any week</button>}
                        {!isDetails && <button>Add guests</button>}
                        {isDetails && <button>Start your search</button>}
                    </article>
                    <div className='search-icon'><SearchIcon /></div>
                </section>

                <section className='sating flex align-center' onClick={toggleModal}>
                    <button className='your-home'>Airbnb your home</button>

                    <LanguageSharpIcon />

                    <article className='user-log flex align-center'>
                        <MenuSharpIcon className='menu-icon' />
                        {!logInUser && <AccountCircleSharpIcon className='user-icon' />}
                        {logInUser && <img src={logInUser.imgUrl} className='profile'/>}
                    </article>

                    {isModal && <article className='log-modal flex column'>
                        <button onClick={() => setIsLog("in")}>Log in</button>
                        <button onClick={() => setIsLog("up")}>Sing up</button>
                        {logInUser &&<button onClick={logout} className='log-out'>Log out</button>}
                    </article>}
                </section>

                {isLog && <SingInUp operation={isLog} closeLog={closeLog} />}
            </section>

            {isSetStay && <SearchStay setIsSetStay={setIsSetStay} />}

        </header>
    )
}