import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import { StatsCard } from '../components/StatsCard/StatsCard'
import * as orderAction from '../store/actions/burgerIndex'

const Withdraw = (props) => {
    let [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('Bitcoin')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [userAccountBalance, setUserAccountBalance] = useState(0)

    useEffect(() => {
        if (props.userData.hasOwnProperty('username')) {

            setUserAccountBalance(props.userData.accountBalance)
        }
    }, [props])

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSelectChange = (e) => {
        setCurrency(e.target.value)
    }
 

    const handleSubmit = (e) => {
        e.preventDefault()

        amount = Number(amount)

        if (amount > userAccountBalance) {
            setMessage('Insufficiant Balance')
            setError(true)
        } else {
            setMessage(
                'Withdrawal sent, Your withdrawal will reflect in your account after we have confirmed it, thanks!! '
            )
            setError(false)
             const formData = {
                 amount,
                 currency             }

             props.onInitWithdrawNow(formData, props.tokenId)
        }
    
    }

    const displayAccountBalance = `$${userAccountBalance}`

    return (
        <>
            <div className='fundAccount'>
                <Row className='fundAccount__balance'>
                    <Col lg={12} sm={12}>
                        <StatsCard
                            bigIcon={
                                <i className='pe-7s-server text-warning' />
                            }
                            statsText='Account Balance'
                            statsValue={displayAccountBalance}
                            statsIcon={<i className='fa fa-refresh' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                </Row>
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

                    <div className='fundAccount__form--btn'>
                        <button className='button' type='submit'>
                            Confirm
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitWithdrawNow: (data, token) =>
            dispatch(orderAction.initWithdrawNow(data, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)
