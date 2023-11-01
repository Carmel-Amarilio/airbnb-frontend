import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useState } from 'react';

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


export function SingInUp({ operation, closeLog }) {

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    function textField(prop) {
        return <TextField id="outlined-basic" {...prop} variant="outlined" />
    }

    function onSubmit(val) {
        console.log(val);
        // if(operation === 'in') login(val)
        // else signup(val)
        // toggleSign()
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) * 100) / e.currentTarget.clientWidth;
        const y = ((e.clientY - rect.top) * 100) / e.currentTarget.clientHeight;
        setMouseX(x);
        setMouseY(y);
    }

    return (
        <section className="sing-in-up">
            <KeyboardArrowLeftSharpIcon className="back" onClick={closeLog} />
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
                    // <Form className='flex column justify-between align-center'>
                    <Form className='form-container'>
                        {operation === 'up' && <div>
                            <Field as={textField} label="Full name" name="fullName" className="input" />
                        </div>}
                        <div>
                            <Field as={textField} label="Username" name="userName" className="input" />
                        </div>
                        <div>
                            <Field as={textField} label="Password" name="password" className="input" />
                        </div>
                        <button
                            onMouseMove={handleMouseMove}
                            style={{ '--mouse-x': mouseX, '--mouse-y': mouseY }}
                            className='submit-bnt action-btn'
                            type='submit'>
                            {operation === 'in' && 'Sign In'}
                            {operation === 'up' && 'Sign Up'}
                        </button>
                    </Form>
                )}
            </Formik>

        </section>
    )
}