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
            <main className="">
                <h1>{stays.length} listings</h1>
                <table className="form-table">
                    <tbody>
                        <tr>
                            <th>LISTING</th>
                            <th>STATUS</th>
                            <th>TO DO</th>
                            <th>CAPACITY</th>
                            <th>BEDROOMS</th>
                            <th>BEDS</th>
                            <th>PRICE</th>
                            <th>LOCATION</th>
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
                                    <button >Update</button>
                                </td>
                                <td> <p>{capacity.guests}</p> </td>
                                <td> <p>{capacity.bedrooms}</p> </td>
                                <td> <p>{capacity.beds}</p> </td>
                                <td> <p>₪{price}</p> </td>
                                <td> <p>{loc.city}, {loc.country}</p> </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </main>

        </section>
    )
}