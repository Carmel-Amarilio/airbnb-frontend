import { useState } from "react";

export function ActionBtn({ line, onClick, type }) {

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;

        setMouseX(x);
        setMouseY(y);
    }


    return (
        <button
            className="action-btn"
            onMouseMove={handleMouseMove}
            style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}
            type={type}
            onClick={onClick}
        >
            {line}
        </button>
    )
}