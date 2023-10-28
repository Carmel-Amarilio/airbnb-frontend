import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

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


export function SingInUp({operation, closeLog}) {
    function textField(prop) {
        return <TextField id="outlined-basic" {...prop} variant="outlined" />
    }

    function onSubmit(val) {
        console.log(val);
        // if(operation === 'in') login(val)
        // else signup(val)
        // toggleSign()
    }
    return (
        <section className="sing-in-up">
            <article className='flex align-center space-between'>
                <KeyboardArrowLeftSharpIcon className="back" onClick={closeLog}/>
                <header>Finish signing up</header>
                <div></div>
            </article>


            <Formik
                initialValues={{
                    fullName: `${(operation === 'in') ? '404' : ''}`,
                    userName: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className='flex column justify-between align-center'>
                        {operation === 'up' && <div>
                            <Field as={textField} label="Full name" name="fullName" className="input" />
                        </div>}
                        <div>
                            <Field as={textField} label="Username" name="userName" className="input" />
                        </div>
                        <div>
                            <Field as={textField} label="Password" name="password" className="input" />
                        </div>
                        <Button type="submit" variant="outlined" className='submit-bnt'>
                            {operation === 'in' && 'Sign In'}
                            {operation === 'up' && 'Sign Up'}
                        </Button>
                    </Form>
                )}
            </Formik>

        </section>
    )
}