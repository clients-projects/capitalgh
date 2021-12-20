import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap'
import { StatsCard } from '../components/StatsCard/StatsCard'

import * as orderAction from '../store/actions/burgerIndex'

function Deposit(props) {
    const [packageProfit, setPackageProfit] = useState(0)
    const [amountToDeposit, setAmountToDeposit] = useState()
    const [packageName, setPackageName] = useState('')
    const [userAccountBalance, setUserAccountBalance] = useState(0)

    const [planDetails, setPlanDetails] = useState({})
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [adminBitcoinAddress, setAdminBitcoinAddress] = useState('')
    const [adminEthereumAddress, setAdminEthereumAddress] = useState('')

    const options = [
        {
            label: '1 Month Package ($300 - $6,999)',
            value: '1 Month Package',
            details: {
                name: '1 Month Package',
                percent: 28,
                duration: '1 Month',
                minimum: 300,
                maximum: 6999,
            },
        },
        {
            label: '3 Months Package ($7000 - $23,999',
            value: '3 Months Package',
            details: {
                name: '3 Months Package',
                percent: 36,
                duration: '3 Months',
                minimum: 7000,
                maximum: 23999,
            },
        },
        {
            label: '6 Months Package ($24,000 - $39,999)',
            value: '6 Months Package ',
            details: {
                name: '6 Months Package ',
                percent: 48,
                duration: '6 Months',
                minimum: 24000,
                maximum: 39999,
            },
        },

        {
            label: '12 Months Package ($40,000 - Unlimited)',
            value: '12 Months Package',
            details: {
                name: '12 Months Package',
                percent: 72,
                duration: '12 Months',
                minimum: 40000,
                maximum: 10000000000000,
            },
        }
    ]

    const customStyles = {
        option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
    }

    const onPackageChange = (newValue) => {
        let selectedPackage = ''
        if (newValue) {
            selectedPackage = newValue.value
        }

        options.map((v) => {
            if (v.value === selectedPackage) {
                console.log({ v })
                const profit = v.details.percent / 100

                setPackageName(v.value)
                setPackageProfit(profit)
                setPlanDetails(v.details)
                setAmountToDeposit()
            }
        })

        console.log({ packageName })
        console.log({ packageProfit })
    }

    const onAmountChange = (e) => {
        let amountValue = e.target.value
        amountValue = parseInt(amountValue)

        if (!amountValue) {
            setMessage('Please enter a value')
            setError(true)
            setAmountToDeposit(amountValue)
        } else {
            setError(false)
            setMessage('')

            options.map((v) => {
                if (v.value === packageName) {
                    console.log({ v })
                    const profit = v.details.percent / 100

                    setPackageName(v.value)
                    setPackageProfit(amountValue * profit)
                }
            })

            setAmountToDeposit(amountValue)
        }
    }

    useEffect(() => {
        if (props.adminData) {
            setAdminBitcoinAddress(props.adminData.bitcoinAccount)
            setAdminEthereumAddress(props.adminData.ethereumAccount)
        }
        if (props.userData.hasOwnProperty('username')) {
            let keepProfits = 0

            console.log('total user deposits', props.userDeposits)

            props.userDeposits.map((p) => {
                keepProfits += p.profit
            })

            const accountBalandProfits =
                props.userData.accountBalance + keepProfits

            setUserAccountBalance(accountBalandProfits)
        }
    }, [props])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            packageName,
            amountToDeposit: Math.floor(amountToDeposit),
            currency: 'Bitcoin',
        }

        if (packageName === '') {
            setMessage('Select a package')
            return setError(true)
        }
        if (!amountToDeposit || amountToDeposit === 0) {
            setMessage('Please enter a value')
            return setError(true)
        } else {
            setError(false)
            setMessage('')

            if (!error) {
                //  props.onInitInvestNow(formData, props.tokenId)

                props.history.push('/admin/plan-confirmation/:' + packageName, {
                    ...formData,
                    packageName,
                    planDetails,
                    adminBitcoinAddress,
                    adminEthereumAddress,
                })
            }
        }
    }

    const displayUserFunds = `$${userAccountBalance}`

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
                            statsValue={displayUserFunds}
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
                    <>
                        <label style={{ color: 'white' }}>Package:</label>
                        <Select
                            options={options}
                            isClearable
                            styles={customStyles}
                            onChange={onPackageChange}
                        />
                    </>
                    <input
                        type='number'
                        className='fundAccount__form--input'
                        placeholder='Enter amount - USD'
                        name='amount'
                        id='amount'
                        value={amountToDeposit || ''}
                        onChange={onAmountChange}
                        min={planDetails.minimum}
                        max={planDetails.maximum}
                    />

                    <h2
                        style={{
                            textAlign: 'center',
                            margin: '20px',
                            color: 'white',
                        }}
                    >
                        Total Profit:{' '}
                        {amountToDeposit ? (
                            <strong>
                                ${Math.floor(amountToDeposit + packageProfit)}
                            </strong>
                        ) : (
                            ''
                        )}
                    </h2>

                    <FormGroup className='fundAccount__form--instruction'>
                        <FormControl.Static>
                            INSTRUCTIONS: Transfer the equivalent amount in
                            bitcoin.
                        </FormControl.Static>
                    </FormGroup>

                    <div className='fundAccount__form--btn'>
                        <button type='submit' className='button'>
                            {props.fundLoading ? 'Loading...' : 'Proceed'}
                        </button>
                    </div>
                </form>

                <div className='fundAccount__form'>
                    <FormGroup className='fundAccount__form--contact'>
                        <FormControl.Static>
                            Contact management at support@capitalgainhub.com for
                            other payment methods
                        </FormControl.Static>
                    </FormGroup>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        tokenId: state.auth.tokenId,
        userData: state.auth.userData,
        userDeposits: state.auth.userDeposits,
        userFundAccount: state.auth.userFundAccount,
        userId: state.auth.userId,
        totalUserDeposits: state.auth.totalUserDeposits,
        totalUserWithdrawals: state.auth.totalUserWithdrawals,
        fundAccountCount: state.auth.fundAccountCount,
        adminData: state.user.adminData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onInitGetUser: (token) => dispatch(actionTypes.initGetUser(token)),
        onInitInvestNow: (data, token) =>
            dispatch(orderAction.initInvestNow(data, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Deposit)
