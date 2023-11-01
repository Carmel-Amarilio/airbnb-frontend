import { useState } from "react";

export function OrderForm({currStay}) {

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;

        setMouseX(x);
        setMouseY(y);
    }

    const {price, capacity } = currStay
    return (
        <section className="order-form">
            <article className="flex space-between align-center">
                <h1>₪{price} <span>night</span></h1>
                <p> reviews</p>
            </article>
            <article className="date-order">
                <article className="btn-date">
                    <button className="btn">
                        <h5>CHECK-IN</h5>
                        <p>Add date</p>
                    </button>
                    <button>
                        <h5>CHECK-OUT</h5>
                        <p>Add date</p>
                    </button>
                </article>
                <button>
                    <h5>GUESTS</h5>
                    <p>{capacity} guests</p>
                </button>
            </article>

            <button
                className="action-btn"
                onMouseMove={handleMouseMove}
                style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}>
                Check availability
            </button>
        </section>
    )
}