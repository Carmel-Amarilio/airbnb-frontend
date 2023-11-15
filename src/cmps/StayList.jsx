import { StayPreview } from "./StayPreview"

export function StayList({ stays, onLike, loggedinUser }) {
    return (
        <section className="stays-list card-grid">
            {stays.map(stay =>
                <StayPreview stay={stay} key={stay._id} onLike={onLike} loggedinUser={loggedinUser} />
            )}
        </section>
    )
}