import { useSelector } from "react-redux"
import { loadStays, updateStay } from "../store/actions/stay.actions";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { main } from "@popperjs/core";
import { LoaderPage } from "./LoaderPage";

export function Wishlist() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            loadStays({ wishlist: loggedinUser._id })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [loggedinUser]);

    function onLike(stayLike) {
        if (!loggedinUser) {
            setIsLog("in")
            return
        }
        const likeIndx = stayLike.likedByUsers.findIndex((user) => user._id === loggedinUser._id)
        if (likeIndx >= 0) stayLike.likedByUsers.splice(likeIndx, 1);
        else stayLike.likedByUsers.push(loggedinUser)
        updateStay(stayLike)
    }

    if (!stays) return (<LoaderPage />)
    return (
        <section className="wishlist main-container">
            <StayHeader isUserPage={true} />
            {!!stays.length && <h1>Wishlists</h1>}
            {!stays.length ?
                <section className="empty-page" >
                    <h1>Wishlists</h1>
                    <div>
                        <h2>Create your first wishlist</h2>
                        <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
                        <button className="form-btn" onClick={() => navigate("/stay")}>Start searching</button>
                    </div>
                </section> :
                <StayList stays={stays} onLike={onLike} loggedinUser={loggedinUser} />}
        </section>
    )
}