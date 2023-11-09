import React, { useEffect, useState } from 'react';
import { cloudinaryServices } from '../../services/cloudinary-service';
import imgUrl from '../../assets/img/dragImg.png'
import DeleteIcon from '@mui/icons-material/Delete';

export function AddImgStay({ imgUrls, setStay, setIsNext }) {
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        if (imgUrls.length < 5) setIsNext(false)
        else setIsNext(true)
    }, [imgUrls])

    async function onAddImg(ev) {
        const newImgUrls = [...imgUrls];
        const imgUrl = await cloudinaryServices.uploadImg(ev);
        newImgUrls.push(imgUrl);
        setStay("imgUrls", newImgUrls);
    }

    function deleteImg(imgUrl) {
        const newImgUrls = [...imgUrls];
        newImgUrls.splice(newImgUrls.indexOf(imgUrl), 1)
        setStay("imgUrls", newImgUrls);
    }


    function handleDragEnter(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragLeave() {
        setDragging(false);
    }

    async function handleDrop(e) {
        const newImgUrls = [...imgUrls];
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const imgUrl = await cloudinaryServices.uploadDragImg(e)
            newImgUrls.push(imgUrl);
            setStay("imgUrls", newImgUrls);
        } else {
            console.error("No files were dropped.");
        }
    }



    return (
        <section className="add-img-stay">
            <h3>Add some photos of your home</h3>
            <p>You'll need 5 photos to get started. You can add more or make changes later.</p>

            <section
                className={`drag-img ${dragging ? 'dragging' : ''} flex column align-center`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <img src={imgUrl} />
                {!dragging && <div className='flex column align-center'>
                    <h4>Drag your photos here</h4>
                    <p>Choose at least 5 photos</p>
                </div>}
                {!dragging && <label htmlFor="file-upload" className="custom-file-upload">
                    Upload from your device
                </label>}
                {dragging && <h4>Drop to upload</h4>}
                <input id="file-upload" type="file" className="add-img" onChange={onAddImg} />
            </section>

            <section className="select-img">
                {imgUrls.map(imgUrl =>
                    <div key={imgUrl}>
                        <img src={imgUrl} />
                        <button className='delete' onClick={() => deleteImg(imgUrl)}> <DeleteIcon /> </button>
                    </div>
                )}

            </section>



        </section>
    );
}
