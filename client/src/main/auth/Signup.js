import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import * as orderAction from '../../store/actions/burgerIndex'
import Input from '../Input'
import Button from '../Button'
import { required, length, email } from '../../util/validators'
import Auth from './Auth'
import ReactParticles from '../../components/ReactParticles'

const Signup = (props) => {
    const parsed = queryString.parse(window.location.search)

    const [state, setState] = useState({
        signupForm: {
            fullname: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 6 })],
            },
            username: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 3 })],
            },
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email],
            },
            confirmEmail: {
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
            confirmPassword: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 6 })],
            },
            bitcoinAccount: {
                value: '',
                valid: false,
                touched: false,
                validators: [length({ min: 26 })],
            },
            ethereumAccount: {
                value: '',
                valid: false,
                touched: false,
                validators: [length({ min: 40 })],
            },
            referral: {
                value: parsed.ref ? parsed.ref : '',
                valid: false,
                touched: false,
                validators: [length({ min: 3 })],
            },
        },
        formValid: false,
    })

    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (props.err) {
            setMessage({
                error: props.err.page === 'signup' ? props.err.error : null,
            })
        } else if (props.tokenId) {
            setMessage({
                success: 'Success',
            })
        }
    }, [props])

    const inputChangeHandler = (input, value) => {
        setState((prevState) => {
            let isValid = true
            for (const validator of prevState.signupForm[input].validators) {
                const emailValue = prevState.signupForm.email.value
                const passwordValue = prevState.signupForm.password.value

                if (input === 'confirmEmail') {
                    if (emailValue !== value) {
                        isValid = false
                    } else {
                        isValid = true
                    }
                }
                if (input === 'confirmPassword') {
                    if (passwordValue !== value) {
                        isValid = false
                    } else {
                        isValid = true
                    }
                }

                isValid = isValid && validator(value)
            }
            const updatedForm = {
                ...prevState.signupForm,
                [input]: {
                    ...prevState.signupForm[input],
                    valid: isValid,
                    value: value,
                    touched: true,
                },
            }
            let formIsValid = true
            for (const inputName in updatedForm) {
                if (
                    inputName !== 'formValid' &&
                    inputName !== '[object Object]' &&
                    inputName !== 'bitcoinAccount' &&
                    inputName !== 'ethereumAccount' &&
                    inputName !== 'referral'
                ) {
                    formIsValid = formIsValid && updatedForm[inputName].valid
                }
            }
            return {
                signupForm: updatedForm,
                formValid: formIsValid,
            }
        })
    }

    const inputBlurHandler = (input) => {}

    const handleSignup = (e) => {
        e.preventDefault()
        if (state.formValid) {
            props.onInitSignup(state)
        } else {
            setMessage({ error: 'Wrong Input, please check your entries' })
        }
    }

    if (props.redirectToLoginPage) {
        props.history.push(props.redirectToLoginPage)
    }

    return (
        <>
        <ReactParticles/>
            <Auth message={message}>
                <form onSubmit={handleSignup} className='form__box'>
                    <div className='form-1'>
                        <h3 className='heading-3 form__heading'>
                            Personal Information
                        </h3>
                        <Input
                            id='fullname'
                            label='Fullname'
                            type='text'
                            control='input'
                            minLength={6}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('fullname')}
                            value={state.signupForm['fullname'].value}
                            valid={state.signupForm['fullname'].valid}
                            touched={state.signupForm['fullname'].touched}
                        />
                        <Input
                            id='username'
                            label='Username'
                            type='text'
                            control='input'
                            minLength={3}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('username')}
                            value={state.signupForm['username'].value}
                            valid={state.signupForm['username'].valid}
                            touched={state.signupForm['username'].touched}
                        />

                        <Input
                            id='email'
                            label='E-Mail'
                            type='email'
                            control='input'
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('email')}
                            value={state.signupForm['email'].value}
                            valid={state.signupForm['email'].valid}
                            touched={state.signupForm['email'].touched}
                        />
                        <Input
                            id='confirmEmail'
                            label='Confirm E-Mail'
                            type='email'
                            control='input'
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('confirmEmail')}
                            value={state.signupForm['confirmEmail'].value}
                            valid={state.signupForm['confirmEmail'].valid}
                            touched={state.signupForm['confirmEmail'].touched}
                        />
                    </div>
                    <div className='form-2'>
                        <h3 className='heading-3 form__heading'>
                            Account Information
                        </h3>

                        <Input
                            id='password'
                            label='Password'
                            type='password'
                            control='input'
                            minLength={6}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('password')}
                            value={state.signupForm['password'].value}
                            valid={state.signupForm['password'].valid}
                            touched={state.signupForm['password'].touched}
                        />
                        <Input
                            id='confirmPassword'
                            label='confirm Password'
                            type='password'
                            control='input'
                            minLength={6}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('confirmPassword')}
                            value={state.signupForm['confirmPassword'].value}
                            valid={state.signupForm['confirmPassword'].valid}
                            touched={
                                state.signupForm['confirmPassword'].touched
                            }
                        />
                        <Input
                            id='referral'
                            label='Referral'
                            type='text'
                            control='input'
                            placeholder='optional'
                            minLength={3}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('referral')}
                            value={state.signupForm['referral'].value}
                            valid={state.signupForm['referral'].valid}
                            touched={state.signupForm['referral'].touched}
                        />
                    </div>
                    <div className='form-3'>
                        <h3 className='heading-3 form__heading'>
                            Currency Information
                        </h3>

                        <Input
                            id='bitcoinAccount'
                            label='Bitcoin Account'
                            type='text'
                            control='input'
                            minLength={26}
                            placeholder='optional'
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('bitcoinAccount')}
                            value={state.signupForm['bitcoinAccount'].value}
                            valid={state.signupForm['bitcoinAccount'].valid}
                            touched={state.signupForm['bitcoinAccount'].touched}
                        />
                        <Input
                            id='ethereumAccount'
                            label='Ethereum Account'
                            type='ethereumAccount'
                            control='input'
                            placeholder='optional'
                            minLength={40}
                            onChange={inputChangeHandler}
                            onBlur={inputBlurHandler.bind('ethereumAccount')}
                            value={state.signupForm['ethereumAccount'].value}
                            valid={state.signupForm['ethereumAccount'].valid}
                            touched={
                                state.signupForm['ethereumAccount'].touched
                            }
                        />
                    </div>

                    <div className='form-btn'>
                        <Input
                            required='true'
                            value=''
                            id='signupCheckbox'
                            label='checkbox'
                            type='checkbox'
                            control='checkbox'
                        />
                        <Button
                            design='raised'
                            type='submit'
                            loading={props.loading}
                        >
                            {props.loading ? 'Loading...' : 'Signup'}
                        </Button>
                    </div>
                </form>
            </Auth>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.auth.loading,
        redirectToLoginPage: state.auth.redirect,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitSignup: (state) => dispatch(orderAction.initSignup(state)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
