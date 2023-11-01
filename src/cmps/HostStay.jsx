export function HostStay({ currStay }) {
    const { host, reviews } = currStay
    return (
        <section className="host-stay">
            <div className="host flex align-center">
                <img src={host.imgUrl} className="profile" />
                <div>
                    <h2> Hosted by {host.fullname}</h2>
                    <p>Joined in September 2023</p>
                </div>
            </div>
            <button className="form-btn">
                <h3>Contact Host</h3>
            </button>
        </section>
    )
}