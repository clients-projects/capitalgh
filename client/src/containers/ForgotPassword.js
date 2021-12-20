import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactParticles from '../components/ReactParticles'

import * as orderAction from '../store/actions/burgerIndex'

import Button from '../main/Button'
import Input from '../main/Input'

import { required, email } from '../util/validators'
import Auth from '../main/auth/Auth'

const Login = (props) => {
    const [state, setState] = useState({
        loginForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email],
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
        } else if (props.tokenId) {
            props.history.push('/admin/dashboard')
            setMessage({
                success: 'Success',
            })
        }
    }, [props])

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
            setMessage({
                success: 'Your recovery link has been sent to your email',
            })
        } else {
            setMessage({ error: 'Wrong Input, please check your entries' })
        }
    }

    return (
        <>
            <ReactParticles />

            <Auth login message={message}>
                <h1 className='form__heading form__heading--forgottenPassword'>
                    Retrive Password
                </h1>
                <form onSubmit={handleLogin}>
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
                    <div className='form-btn'>
                        <Button
                            design='raised'
                            type='submit'
                            loading={props.loading}
                        >
                            {props.loading ? 'Loading...' : 'Send'}
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
