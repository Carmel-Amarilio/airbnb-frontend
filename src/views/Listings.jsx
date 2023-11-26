import { useSelector } from "react-redux";
import { StayHeader } from "../cmps/StayHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStays } from "../store/actions/stay.actions";

export function Listings() {
    const navigate = useNavigate();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        if (!loggedinUser) navigate("/stay")
        else {
            loadStays({ userId: loggedinUser._id })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [loggedinUser])

    console.log(stays);
    return (
        <section className="listings main-container">
            <StayHeader isUserPage={true} />
            {!stays.length ?
                <section className="empty-page" >
                    <h1>Listings</h1>
                    <div>
                        <h2>You haven't posted your house yet</h2>
                        <p>It's time to advertise your home in the best possible way</p>
                        <button className="form-btn" onClick={() => navigate("/about-your-place")}> Airbnb your home</button>
                    </div>
                </section> :
                <main >
                    <h1>{stays.length} listings</h1>
                    <table className="form-table">
                        <tbody>
                            <tr>
                                <th className="listings">LISTING</th>
                                <th className="status">STATUS</th>
                                <th className="to-do">TO DO</th>
                                <th className="capacity">CAPACITY</th>
                                <th className="bedrooms">BEDROOMS</th>
                                <th className="beds">BEDS</th>
                                <th className="price">PRICE</th>
                                <th className="loc">LOCATION</th>
                            </tr>
                            {stays.map(stay => {
                                const { _id, imgUrls, name, capacity, loc, price } = stay
                                return <tr key={_id}>
                                    <td className="listings flex align-center">
                                        <img src={imgUrls[0]} />
                                        <h3>{name}</h3>
                                    </td>
                                    <td className="status">
                                        <article className="flex align-center">
                                            <div></div>
                                            <p>Listed</p>
                                        </article>
                                    </td>
                                    <td className="to-do">
                                        <button onClick={() => navigate(`/about-your-place?stayId=${_id}`)}>Update</button>
                                    </td>
                                    <td className="capacity"> <p>{capacity.guests}</p> </td>
                                    <td className="bedrooms"> <p>{capacity.bedrooms}</p> </td>
                                    <td className="beds"> <p>{capacity.beds}</p> </td>
                                    <td className="price" > <p>₪{price}</p> </td>
                                    <td className="loc"> <p>{loc.city}, {loc.country}</p> </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </main>}

        </section>
    )
}