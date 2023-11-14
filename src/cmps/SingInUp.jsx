import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { login, signup } from '../store/actions/user.actions';
import { cloudinaryServices } from '../services/cloudinary-service';
import { ActionBtn } from './ActionBtn';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    userName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
})


export function SingInUp({ operation, closeLog, setOperation, isOrder = false }) {

    // const [mouseX, setMouseX] = useState(0);
    // const [mouseY, setMouseY] = useState(0);
    const [userImgUrl, setUserImgUrl] = useState(null);
    function textField(prop) {
        return <TextField id="outlined-basic" {...prop} variant="outlined" />
    }

    function onSubmit(val) {
        val = { ...val, imgUrl: userImgUrl }
        console.log(val);
        if (operation === 'in') login(val)
        else signup(val)
        if (!isOrder) closeLog()
    }

    async function onAddImg(ev) {
        const imgUrl = await cloudinaryServices.uploadImg(ev)
        setUserImgUrl(imgUrl)
    }


    return (
        <section className="sing-in-up">
            {!isOrder && <KeyboardArrowLeftSharpIcon className="back" onClick={closeLog} />}
            <h2>Finish signing up</h2>


            <Formik
                initialValues={{
                    fullName: `${(operation === 'in') ? '404' : ''}`,
                    userName: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className='form-container flex column'>
                        {operation === 'up' && <div className='flex justify-center'>
                            <input id="file-upload" onChange={onAddImg} type="file" className="add-img" />
                            <label htmlFor="file-upload" className='upload-profile'>
                                {userImgUrl ? <img src={userImgUrl} htmlFor="file-upload" className='profile' /> :
                                <AccountCircleSharpIcon className='user-icon' htmlFor="file-upload" />}
                            </label>
                        </div>}
                        {operation === 'up' && <div>
                            <Field as={textField} label="Full name" name="fullName" className="input" />
                        </div>}
                        <div>
                            <Field as={textField} label="Username" name="userName" className="input" />
                        </div>
                        <div>
                            <Field as={textField} label="Password" name="password" className="input" />
                        </div>

                        {operation === 'in' && <ActionBtn line={"Sign In"} className='submit-bnt' type='submit' />}
                        {operation === 'up' && <ActionBtn line={"Sign Up"} className='submit-bnt' type='submit' />}

                    </Form>
                )}
            </Formik>

            {isOrder && operation === 'in' && <button className='underline-btn' onClick={() => setOperation("up")}>Sign Up</button>}
            {isOrder && operation === 'up' && <button className='underline-btn' onClick={() => setOperation("in")}>Sign In</button>}
        </section>
    )
}