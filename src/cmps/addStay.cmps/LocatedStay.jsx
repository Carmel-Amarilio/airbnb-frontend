import { useEffect } from "react";
import { StayMap } from "../StayMap";
import { stayService } from "../../services/stay.service";
import { utilService } from "../../services/util.service";

export function LocatedStay({ loc, setStay, setIsNext }) {
    const { country, countryCode, city, address, lat, lng } = loc

    useEffect(() => {
        if (country.length < 2 || city.length < 2 || address.length < 2 || lat === 0 || lng === 0) setIsNext(false)
        else setIsNext(true)
    }, [country, city, address, lat, lng])


    function handleSearch(key, { target }) {
        let val = target.value
        const newLoc = { ...loc, [key]: val }
        // setStay("loc", newLoc)

        if (key === "city") {
            getLngLan(val)
        } else setStay("loc", newLoc)
    }


    async function getLngLan(city) {
        const res = await stayService.getLngLan(city);
        console.log(res[0]);
        const newLoc = { ...loc, ["city"]: city, ["lat"]: res[0].lat, ["lng"]: res[0].lon, ["countryCode"]: res[0].country }
        setStay("loc", newLoc)
    }

    console.log(loc);
    return (
        <section className="located-stay">
            <h3>Where's your place located?</h3>
            <p>Your address is only shared with guests after they’ve made a reservation.</p>
            <StayMap loc={loc} />
            <article className="search flex column align-center">
                <div className=" flex">
                    <input onChange={(ev) => handleSearch("country", ev)} value={country} placeholder="Enter your country" />
                    <input onChange={(ev) => handleSearch("city", ev)} value={city} placeholder="Enter your city" />
                </div>
                <input onChange={(ev) => handleSearch("address", ev)} value={address} placeholder="Enter your address" />
            </article>
        </section>
    )
}