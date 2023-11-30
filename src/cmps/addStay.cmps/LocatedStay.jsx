import { useEffect, useState } from "react";
import { StayMap } from "../StayMap";
import { stayService } from "../../services/stay.service";
import { utilService } from "../../services/util.service";
import SearchIcon from '@mui/icons-material/Search';

export function LocatedStay({ loc, setStay, setIsNext }) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const { country, city, street, houseNumber, lat, lng } = loc

    useEffect(() => {
        if (country.length < 2 || city.length < 2 || street.length < 2 || lat === 0 || lng === 0) setIsNext(false)
        else setIsNext(true)
    }, [country, city, street, lat, lng])


    function handleSearch(key, { target }) {
        let val = target.value
        const newLoc = { ...loc, [key]: val }
        setStay("loc", newLoc)
    }


    async function getLocOnMap() {
        if(!country || !city || !street) return
        const res = await stayService.getLngLan(country, city, street, houseNumber);
        const newLoc = { ...loc, ["lat"]: res[0].lat, ["lng"]: res[0].lon }
        setStay("loc", newLoc)
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;
        setMouseX(x);
        setMouseY(y);
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
                <div className=" flex">
                    <input onChange={(ev) => handleSearch("street", ev)} value={street} placeholder="Enter your street" />
                    <input onChange={(ev) => handleSearch("houseNumber", ev)} value={houseNumber} placeholder="Enter your house number" />
                </div>
                <div
                    onMouseMove={handleMouseMove}
                    style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}
                    onClick={getLocOnMap}
                    className='action-btn flex align-center justify-center'
                >
                    <SearchIcon /> Search
                </div>
            </article>
        </section>
    )
}