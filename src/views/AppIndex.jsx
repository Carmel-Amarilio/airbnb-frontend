import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect, useState } from "react";
import { loadStays, updateStays } from "../store/actions/stay.actions";
import { StayFilter } from "../cmps/StayFilter";
import { SingInUp } from "../cmps/SingInUp";
import { useLocation } from "react-router";

export function AppIndex() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const [filter, setFilter] = useState({});
    const [isLog, setIsLog] = useState(false)

    console.log(filter);
    useEffect(() => {
        const labelFilter = searchParams.get('label');
        const destinations = searchParams.get('destinations');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const adults = searchParams.get('adults');
        const children = searchParams.get('children');
        const infants = searchParams.get('infants');
        const newFilter = {
            label: labelFilter || 'Amazing views', destinations: destinations || "", checkIn: checkIn ? new Date(checkIn) : null, checkOut: checkOut ? new Date(checkOut) : null, guests: { adults: +adults || 0, children: +children || 0, infants: +infants || 0 }
        }
        setFilter(newFilter)
        loadStays(newFilter)
            .catch((err) => {
                console.log(err)
            })
    }, [location.search]);

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
            <StayHeader setIsLog={setIsLog} filter={filter} setFilter={setFilter} />
            <StayFilter filter={filter} />
            <StayList stays={stays} onLike={onLike} loggedinUser={loggedinUser} />
            {isLog && <SingInUp operation={isLog} closeLog={closeLog} />}
        </section>
    )
}