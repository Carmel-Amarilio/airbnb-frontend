import { useEffect, useState } from 'react';
import imgUrl from '../../assets/img/home2.png'


export function PublishStay({setIsNext, onAddStay}) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        setIsNext(false)
    }, [])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;
        setMouseX(x);
        setMouseY(y);
    }


    return (
        <section className="add-stay-publish flex align-center ">
            <article>
                <h4>Publish</h4>
                <h2>Finish up and publish</h2>
                <p>You're finally ready to publish your place, when you're ready click the Publish button and we'll do the rest</p>
                <button
                    onMouseMove={handleMouseMove}
                    style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}
                    onClick={onAddStay}
                    className='action-btn'>
                    Publish
                </button>
            </article>
            <img src={imgUrl} />
        </section>
    )
}