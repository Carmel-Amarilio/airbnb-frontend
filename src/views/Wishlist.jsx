import { useSelector } from "react-redux"
import { loadStays, updateStays } from "../store/actions/stay.actions";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
        updateStays(stayLike)
    }

    return (
        <section className="wishlist main-container">
            <StayHeader isUserPage={true} />
            <h1>Wishlists</h1>
            <StayList stays={stays} onLike={onLike} loggedinUser={loggedinUser} />
            {/* {isLog && <SingInUp operation={isLog} closeLog={closeLog} />} */}
        </section>
    )
}