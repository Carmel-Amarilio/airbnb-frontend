import { StayPreview } from "./StayPreview"

export function StayList({ stays }) {
    if (stays.length === 0 || !stays) return (<div>loading...</div>)
    return (
        <section className="stays-list card-grid">
            {stays.map(stay =>
                <StayPreview stay={stay}  key={stay._id}/>
            )}
        </section>
    )
}