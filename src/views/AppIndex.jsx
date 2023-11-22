import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect, useState } from "react";
import { loadStays, updateStay } from "../store/actions/stay.actions";
import { StayFilter } from "../cmps/StayFilter";
import { SingInUp } from "../cmps/SingInUp";
import { useLocation } from "react-router";
import { StaysMap } from "../cmps/StaysMap";

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
        updateStay(stayLike)
    }

    console.log(stays);
    return (
        <section className="app-index main-container">
            <StayHeader setIsLog={setIsLog} filter={filter} setFilter={setFilter} />
            <StayFilter filter={filter} />
            <main>
                {!stays.length ?
                    <section className="empty-page" >
                        <div>
                            <h2>No results</h2>
                            <p>Try changing or removing some of your filters or adjusting your search area.</p>
                        </div>
                    </section> :
                    <StayList stays={stays} onLike={onLike} loggedinUser={loggedinUser} />}
                {(!!stays.length && !!filter.destinations) && <StaysMap stays={stays} onLike={onLike} loggedinUser={loggedinUser} />}
            </main>

            {isLog && <SingInUp operation={isLog} closeLog={closeLog} />}
        </section>
    )
}