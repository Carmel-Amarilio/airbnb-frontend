import imgUrl from '../assets/img/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {  useState } from 'react';
import { SearchStay } from './SearchStay';
import { useSelector } from 'react-redux';
import { logout } from '../store/actions/user.actions';
import { useNavigate } from 'react-router';

export function StayHeader({ setIsLog, isDetails = false }) {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [isModal, setIsModal] = useState(false)
    const [isSetStay, setIsSetStay] = useState(false)


    function toggleModal() {
        setIsModal(!isModal)
    }

    function onAirbnbYourHome(){
        if (!loggedinUser) setIsLog("in")
        else navigate("/about-your-place")
    }

    return (
        <header className="stay-header main-container full" >
            <section className="flex align-center space-between">
                <section className='logo flex align-center' onClick={()=> navigate("/stay")}>
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

                <section className='sating flex align-center' >
                    <button className='your-home' onClick={onAirbnbYourHome}>Airbnb your home</button>

                    <LanguageSharpIcon />

                    <article className='user-log flex align-center' onClick={toggleModal}>
                        <MenuSharpIcon className='menu-icon' />
                        {!loggedinUser && <AccountCircleSharpIcon className='user-icon' />}
                        {loggedinUser && (loggedinUser.imgUrl ?
                            <img src={loggedinUser.imgUrl} className='profile' />
                            : <div className='no-img flex justify-center align-center'>{loggedinUser.fullName[0]}</div>)}
                    </article>

                    {isModal && <article className='log-modal flex column'>
                        <button onClick={() => setIsLog("in")}>Log in</button>
                        <button onClick={() => setIsLog("up")}>Sing up</button>
                        {loggedinUser && <button onClick={logout} className='log-out'>Log out</button>}
                    </article>}
                </section>


            </section>

            {isSetStay && <SearchStay setIsSetStay={setIsSetStay} />}

        </header>
    )
}