import { StayPreview } from "./StayPreview";
import CancelIcon from '@mui/icons-material/Cancel';

export function StayModal({ stay, onLike, loggedinUser, setSelectedStay }) {
    return (
        <section className="stay-modal">
            <p className="exit" onClick={(ev) => { ev.stopPropagation(); setSelectedStay({}) }} ><CancelIcon /></p>
            <StayPreview stay={stay} onLike={onLike} loggedinUser={loggedinUser} />
        </section >
    )
}