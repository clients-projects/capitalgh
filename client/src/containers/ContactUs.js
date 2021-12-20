import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as orderAction from '../store/actions/burgerIndex'

import Button from '../main/Button'
import Input from '../main/Input'
import ReactParticles from '../components/ReactParticles'

import { required, length, email } from '../util/validators'
import Auth from '../main/auth/Auth'

const Login = (props) => {
    const [state, setState] = useState({
        loginForm: {
            username: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 6 })],
            },
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email],
            },
            message: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 6 })],
            },
            formIsValid: false,
        },
    })

    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (props.err) {
            setMessage({
                error:
                    props.err.page === 'login'
                        ? props.err.error[0].message
                        : null,
            })
        } else if (state.loginForm.formIsValid) {
            setMessage({
                success: 'Success',
            })
        }
    }, [props, state])

    const inputChangeHandler = (input, value) => {
        setState((prevState) => {
            let isValid = true
            for (const validator of prevState.loginForm[input].validators) {
                isValid = isValid && validator(value)
            }

            const updatedForm = {
                ...prevState.loginForm,
                [input]: {
                    ...prevState.loginForm[input],
                    valid: isValid,
                    value: value,
                    touched: true,
                },
            }
            let formIsValid = true
            for (const inputName in updatedForm) {
                if (
                    inputName !== 'formIsValid' &&
                    inputName !== '[object Object]'
                ) {
                    formIsValid = formIsValid && updatedForm[inputName].valid
                }
            }
            return {
                loginForm: updatedForm,
                formIsValid: formIsValid,
            }
        })
    }

    const inputBlurHandler = (input) => {}

    const handleLogin = (e) => {
        e.preventDefault()
        if (state.formIsValid) {
            // props.onInitLogin(
            //     state.loginForm.email.value,
            //     state.loginForm.password.value
            // )
        } else {
            setMessage({ error: 'Wrong Input, please check your entries' })
        }
    }

    return (
        <>
            <ReactParticles />

            <Auth contactUs message={message}>
                <h1 className='contactUs__heading'>Contact Us</h1>
                <form onSubmit={handleLogin}>
                    <Input
                        id='username'
                        label='Username'
                        type='text'
                        control='input'
                        minLength={6}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind('username')}
                        value={state.loginForm['username'].value}
                        valid={state.loginForm['username'].valid}
                        touched={state.loginForm['username'].touched}
                    />
                    <Input
                        id='email'
                        label='E-Mail'
                        type='email'
                        control='input'
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind('email')}
                        value={state.loginForm['email'].value}
                        valid={state.loginForm['email'].valid}
                        touched={state.loginForm['email'].touched}
                    />
                    <Input
                        id='message'
                        label='Message'
                        type='textarea'
                        control='textarea'
                        rows={7}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind('message')}
                        value={state.loginForm['message'].value}
                        valid={state.loginForm['message'].valid}
                        touched={state.loginForm['message'].touched}
                    />

                    <div className='form-btn'>
                        <Button
                            design='raised'
                            type='submit'
                            loading={props.loading}
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </Auth>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitLogin: (email, password) =>
            dispatch(orderAction.initLogin(email, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
