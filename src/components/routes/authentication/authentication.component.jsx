import { useState } from "react";
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../../button/button.component";
import FormInput from "../../form-input/form-input.component";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
import './authentication.styles.scss';

const Authentication = () => {
    const defaultFormFields = {
        email: '',
        password: '',
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault(); //prevents any default beahavior of the form

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email")
                    break;
                default:
                    console.log(error);
            }
        }
    }
    
    return (
        <div className="sign-in-container">
            <div>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                    <FormInput 
                        label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                    <div className='sign-in-button-container'>
                        <Button type="submit">Sign In </Button>
                        <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInGoogleUser}>Sign In With Google </Button>
                    </div>
                </form>
            </div>
            <div>
                <SignUpForm/>
            </div>
        </div>
    )
}

export default Authentication;