export function HostStay({ currStay }) {
    const { host, reviews } = currStay
    console.log(host);
    return (
        <section className="host-stay">
            <div className="host flex align-center">
                
                {(host.imgUrl ?
                    <img src={host.imgUrl} className="profile" />
                    : <div className='no-img flex justify-center align-center'>{host.fullName[0]}</div>)}
                <div>
                    <h2> Hosted by {host.fullName}</h2>
                    <p>Joined in September 2023</p>
                </div>
            </div>
            <button className="form-btn">
                <h3>Contact Host</h3>
            </button>
        </section>
    )
}