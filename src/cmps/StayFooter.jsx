import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.actions";

export function StayFooter({ setIsLog, filter, setFilter, isDetails = false, isUserPage = false }) {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)

    function onAirbnbYourHome() {
        if (!loggedinUser) setIsLog("in")
        else navigate("/about-your-place")
    }

    return (
        <section className="stay-footer flex justify-center align-center space-between ">
            {!loggedinUser && <button onClick={() => setIsLog("in")}>Log in</button>}
            {!loggedinUser && <button className='flex column align-center' onClick={onAirbnbYourHome}>
                <i className="fa-brands fa-airbnb"></i>
                Airbnb your home
            </button>}
            {!loggedinUser && <button onClick={() => setIsLog("up")}>Sing up</button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate("/messages")}>
                <i className="fa-regular fa-message"></i>
                Messages
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate(`/wishlist `)}>
                <i className="fa-regular fa-heart"></i>
                Wishlist
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate("/listings")}>
                <i className="fa-regular fa-paper-plane"></i>
                Listings
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate("/trips")} >
                <i className="fa-brands fa-airbnb"></i>
                Trips
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate("/reservations")}>
                <i className="fa-regular fa-rectangle-list"></i>
                Reservations
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={() => navigate("/about-your-place")}>
                <i className="fa-regular fa-square-plus"></i>
                Add listing
            </button>}
            {loggedinUser && <button className='flex column align-center' onClick={logout} >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Log out
            </button>}
        </section>
    )
}