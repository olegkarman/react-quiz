import React from 'react';
import classes from './Auth.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from 'axios';

class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Type valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Type valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToket: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbH47A5NjgAGA9BhT-h8onwDi2MHCxGBQ', authData);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToket: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbH47A5NjgAGA9BhT-h8onwDi2MHCxGBQ', authData);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    submitHandler = event => {
        event.preventDefault();
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid
        });
    }

    validateControl (value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }

    validateEmail (email) {
        let re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return re.test(email);
    }

    renderInputs () {
        return  Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorisation</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        { this.renderInputs() }

                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Log In
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth;