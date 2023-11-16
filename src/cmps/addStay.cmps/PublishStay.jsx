import { useEffect } from 'react';
import imgUrl from '../../assets/img/home2.png'
import { ActionBtn } from '../ActionBtn';


export function PublishStay({ setIsNext, onAddStay, isExistsStay }) {

    useEffect(() => {
        setIsNext(false)
    }, [])

    console.log(isExistsStay);
    return (
        <section className="add-stay-publish flex align-center ">
            <article>
                <h4>{`${isExistsStay? "Update":"Publish"}`}</h4>
                <h2>Finish up and publish</h2>
                <p>You're finally ready to publish your place, when you're ready click the Publish button and we'll do the rest</p>
                <ActionBtn line={`${isExistsStay? "Update":"Publish"}`} onClick={onAddStay} />
            </article>
            <img src={imgUrl} />
        </section>
    )
}