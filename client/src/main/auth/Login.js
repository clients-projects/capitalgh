import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as orderAction from '../../store/actions/burgerIndex'

import Button from '../Button'
import Input from '../Input'

import { required, length, email } from '../../util/validators'
import Auth from './Auth'
import ReactParticles from '../../components/ReactParticles'

const Login = (props) => {
    const [state, setState] = useState({
        loginForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email],
            },
            password: {
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
                error: props.err.page === 'login' ? props.err.error : null,
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
            props.onInitLogin(
                state.loginForm.email.value,
                state.loginForm.password.value
            )
        } else {
            setMessage({ error: 'Wrong Input, please check your entries' })
        }
    }

    return (
        <>
            <ReactParticles/>
               
            <Auth login message={message}>
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
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        control='input'
                        minLength={6}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler.bind('password')}
                        value={state.loginForm['password'].value}
                        valid={state.loginForm['password'].valid}
                        touched={state.loginForm['password'].touched}
                    />
                    <div className='form-btn'>
                        <Button
                            design='raised'
                            type='submit'
                            loading={props.loading}
                        >
                            {props.loading ? 'Loading...' : 'Login'}
                        </Button>
                        <Link to='/forgot-password' className='form-btn__link'>
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </Auth>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        // loading:false,
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
