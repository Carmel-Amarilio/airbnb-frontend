import { Link } from "react-router-dom";

export function Home() {
    return (
        <section>
            carmel
            <button className="store-btn">
                <Link to={`/stay`}>aircnc</Link>
            </button>
        </section>
    )
}