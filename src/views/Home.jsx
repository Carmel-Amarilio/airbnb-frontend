import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/stay')
    }, []);


    return (
        <section>
            carmel
            <button className="store-btn">
                <Link to={`/stay`}>aircnc</Link>
            </button>
        </section>
    )
}