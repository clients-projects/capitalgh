import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as orderAction from '../../store/actions/burgerIndex'

const DummyWithdrawal = (props) => {
    let [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('Bitcoin')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [status, setStatus] = useState('Approved')
    const [email, setEmail] = useState('')
 

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSelectChange = (e) => {
        setCurrency(e.target.value)
    }

    const handleStatusChange = e => {
        setStatus(e.target.value)
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        amount = Number(amount)

        if (amount === '' || email === '') {
            setMessage('Fields cannot be empty')
            setError(true)
        } else {
            setMessage(
                'Dummy withdrawal sent'
            )
            setError(false)
            const formData = {
                amount,
                currency,
                email,
                status
            }

            props.onInitWithdrawNow(formData, props.tokenId)
        }
    }


    return (
        <>
            <div className='fundAccount'>
               
                <form className='fundAccount__form' onSubmit={handleSubmit}>
                    {message && (
                        <p
                            className={
                                error ? 'message message__error' : 'message'
                            }
                        >
                            {message}
                        </p>
                    )}
                    <input
                        type='email'
                        className='fundAccount__form--input'
                        placeholder='Enter Email'
                        name='amount'
                        id='amount'
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <input
                        type='number'
                        className='fundAccount__form--input'
                        placeholder='Amount to Withdraw'
                        name='amount'
                        id='amount'
                        onChange={handleAmountChange}
                        value={amount}
                    />

                    <select
                        name='select'
                        id='select'
                        onChange={handleSelectChange}
                        value={currency}
                        className='fundAccount__form--select'
                    >
                        <option value='Bitcoin'>Bitcoin</option>
                        <option value='Ethereum'>Ethereum</option>
                    </select>
                    <select
                        name='select'
                        id='select'
                        onChange={handleStatusChange}
                        value={status}
                        className='fundAccount__form--select'
                    >
                        <option value='Approved'>Approved</option>
                        <option value='Pending'>Pending</option>
                    </select>

                    <div className='fundAccount__form--btn'>
                        <button className='button' type='submit'>
                            {
                                props.loading ? 'loading...' :
                                'Confirm'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        tokenId: state.auth.tokenId,
        userData: state.auth.userData,
        userId: state.auth.userId,
        loading: state.user.loading,
        error: state.user.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitWithdrawNow: (data, token) =>
            dispatch(orderAction.initWithdrawNow(data, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DummyWithdrawal)
