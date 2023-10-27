import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { StayList } from "../cmps/StayList";
import { useEffect } from "react";
import { loadStays } from "../store/actions/stay.actions";
import { StayFilter } from "../cmps/StayFilter";

export function AppIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <section className="app-index main-container">
            <StayHeader />
            <StayFilter />
            <StayList stays={stays} />
        </section>
    )
}