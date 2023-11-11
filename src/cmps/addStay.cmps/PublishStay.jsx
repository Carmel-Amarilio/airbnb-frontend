import { useEffect } from 'react';
import imgUrl from '../../assets/img/home2.png'
import { ActionBtn } from '../ActionBtn';


export function PublishStay({ setIsNext, onAddStay }) {

    useEffect(() => {
        setIsNext(false)
    }, [])

    return (
        <section className="add-stay-publish flex align-center ">
            <article>
                <h4>Publish</h4>
                <h2>Finish up and publish</h2>
                <p>You're finally ready to publish your place, when you're ready click the Publish button and we'll do the rest</p>
                <ActionBtn line={"Publish"} onClick={onAddStay} />
            </article>
            <img src={imgUrl} />
        </section>
    )
}