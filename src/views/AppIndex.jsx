import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect, useState } from "react";
import { loadStays, updateStays } from "../store/actions/stay.actions";
import { StayFilter } from "../cmps/StayFilter";
import { SingInUp } from "../cmps/SingInUp";

export function AppIndex() {
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const [isLog, setIsLog] = useState(false)
    useEffect(() => {
        loadStays()
            .catch((err) => {
                console.log(err)
            })
    }, []);

    function closeLog() {
        setIsLog(false)
    }

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
        <section className="app-index main-container">
            <StayHeader setIsLog={setIsLog} />
            <StayFilter />
            <StayList stays={stays} onLike={onLike} loggedinUser={loggedinUser} />
            {isLog && <SingInUp operation={isLog} closeLog={closeLog} />}
        </section>
    )
}