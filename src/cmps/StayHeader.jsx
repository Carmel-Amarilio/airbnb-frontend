import imgUrl from '../assets/img/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useState } from 'react';
import { SearchStay } from './SearchStay';
import { useSelector } from 'react-redux';
import { logout } from '../store/actions/user.actions';
import { useNavigate } from 'react-router';

export function StayHeader({ setIsLog, filter, setFilter, isUserPage = false }) {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [isModal, setIsModal] = useState(false)
    const [isSetStay, setIsSetStay] = useState(false)


    function toggleModal() {
        setIsModal(!isModal)
    }

    function onAircncYourHome() {
        if (!loggedinUser) setIsLog("in")
        else navigate("/about-your-place")
    }

    return (
        <header className="stay-header main-container full" >
            <section className="flex align-center space-between">
                <section className='logo flex align-center' onClick={() => navigate("/stay")}>
                    <img src={imgUrl} />
                    <span>aircnc</span>
                </section>

                {!isUserPage && <section className='set-stay-btn flex align-center'>
                    <article onClick={() => setIsSetStay(!isSetStay)}>
                        <button className='anywhere'>Anywhere</button>
                        <button className='week'>Any week</button>
                        <button className='guests'>Add guests</button>
                        <button className='search'>Start your search</button>
                    </article>
                    <div className='search-icon'><SearchIcon /></div>
                </section>}

                <section className='sating flex align-center' >
                    {!isUserPage && <button className='your-home' onClick={onAircncYourHome}>Aircnc your home</button>}

                    <article className='user-log flex align-center' onClick={toggleModal}>
                        <MenuSharpIcon className='menu-icon' />
                        {!loggedinUser && <AccountCircleSharpIcon className='user-icon' />}
                        {loggedinUser && (loggedinUser.imgUrl ?
                            <img src={loggedinUser.imgUrl} className='profile' />
                            : <div className='no-img flex justify-center align-center'>{loggedinUser.fullName[0]}</div>)}
                    </article>

                    {isModal && <article className='log-modal flex column'>
                        {!loggedinUser && <button onClick={() => setIsLog("in")}>Log in</button>}
                        {!loggedinUser && <button onClick={() => setIsLog("up")}>Sing up</button>}
                        {loggedinUser && <button onClick={() => navigate("/messages")}>Messages</button>}
                        {loggedinUser && <button onClick={() => navigate(`/wishlist `)}>Wishlist</button>}
                        {loggedinUser && <button onClick={() => navigate("/trips")} >Trips</button>}
                        {loggedinUser && <button onClick={() => navigate("/listings")} className='head-line'>Listings</button>}
                        {loggedinUser && <button onClick={() => navigate("/reservations")}>Reservations</button>}
                        {loggedinUser && <button onClick={() => navigate("/about-your-place")}>Add listing</button>}
                        {loggedinUser && <button onClick={logout} className='head-line light-clr'>Log out</button>}
                    </article>}
                </section>

            </section>

            {isSetStay && <SearchStay setIsSetStay={setIsSetStay} filter={filter} setFilter={setFilter} />}

        </header>
    )
}