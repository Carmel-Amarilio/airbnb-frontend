import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StayHeader } from "../cmps/StayHeader";

export function Reservations() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    return (
        <section className="reservations">
            <StayHeader isUserPage={true} />
        </section>
    )
}