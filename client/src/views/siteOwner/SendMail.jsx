import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
    Grid,
    Row,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    Table,
} from 'react-bootstrap'

import { Card } from '../../components/Card/Card'

import * as orderAction from '../../store/actions/burgerIndex'

const thDepositArray = ['No', 'Amount', 'Package', 'profit', 'Date']

const SendMail = (props) => {
    const [userDeposits, setUserDeposits] = useState([])
    const [profit, setProfit] = useState({})

    const gottenAllUser = useRef()

    const parsed = queryString.parse(window.location.search)

    useEffect(() => {
        if (!gottenAllUser.current) {
            if (props.tokenId) {
                props.onInitGetMember(parsed.id, props.tokenId)
            }
            gottenAllUser.current = true
        } else {
            if (props.memberDeposits) {
                setUserDeposits(props.memberDeposits)
            }
        }
    }, [props, parsed.id])

    const [accountBalance, setAccountBalance] = useState(0)
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bitcoin, setBitcoin] = useState('')
    const [ethereum, setEthereum] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmNewPassword] = useState('')

    const [oldEmail, setOldEmail] = useState('')
    const [activeReferrals, setActiveReferrals] = useState(0)
    const [totalReferrals, setTotalReferrals] = useState(0)
    const [dailyEarning, setDailyEarning] = useState(0)
    const [totalEarnings, setTotalEarnings] = useState(0)
    const [totalReferralCommission, setTotalReferralCommission] = useState(0)

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'fullname') {
            setFullname(value)
        }
        if (name === 'dailyEarning') {
            setDailyEarning(value)
        }
        }
    }

    const handleMember = (e, p) => {
        setProfit({
            [p.fundNO]: e.target.value,
        })
    }

    const updateMemberProfit = (id) => {
        for (let i = 0; i < props.memberId.length; i++) {
            if (id === i) {
                props.onInitUpdateProfit(
                    profit[i + 1],
                    props.memberId[i]._id,
                    props.tokenId
                )
            }
        }
    }

    useEffect(() => {
        if (props.member) {
            const fetchedBitcoin = props.member.bitcoinAccount
            const fetchedEmail = props.member.email
            const fetchedEthereum = props.member.ethereumAccount
            const fetchedFullname = props.member.fullname
            const fetchedUsername = props.member.username
            const fetchedCity = props.member.city
            const fetchedCountry = props.member.country
            const fetchedPhone = props.member.phone
            const fetchedDailyEarning = props.member.dailyEarning
            const fetchedTotalEarnings = props.member.totalEarnings
            const fetchedAccountBalance = props.member.accountBalance
            const fetchedActiveReferrals = props.member.activeReferrals
            const fetchedTotalReferrals = props.member.totalReferrals
            const fetchedTotalReferralCommission =
                props.member.totalReferralCommission

            setFullname(fetchedFullname)

            setCity(fetchedCity)
            setCountry(fetchedCountry)
            setPhone(fetchedPhone)
            setUsername(fetchedUsername)

            setEmail(fetchedEmail)
            setOldEmail(fetchedEmail)
            setBitcoin(fetchedBitcoin)

            setEthereum(fetchedEthereum)

            setDailyEarning(fetchedDailyEarning)
            setTotalEarnings(fetchedTotalEarnings)
            setActiveReferrals(fetchedActiveReferrals)
            setTotalReferrals(fetchedTotalReferrals)
            setTotalReferralCommission(fetchedTotalReferralCommission)
            setAccountBalance(fetchedAccountBalance)
        }
    }, [props])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            setError(true)
            return
        } else {
            setMessage('Updated successfully')
            setError(false)
        }
        const formData = {
            accountBalance: Number(accountBalance),
            fullname,
            username,
            password,
            oldEmail,
            email,
            city,
            dailyEarning: Number(dailyEarning),
            totalEarnings: Number(totalEarnings),
            activeReferrals: Number(activeReferrals),
            totalReferrals: Number(totalReferrals),
            totalReferralCommission: Number(totalReferralCommission),
            country,
            phone,
            ethereum,
            bitcoin,
            confirmPassword,
        }

        props.onInitUpdateMember(formData, props.tokenId)
    }

    return (
        <div className='center' style={{ margin: '2rem 0' }}>
            <Grid fluid>
                <Row style={{ display: 'grid' }}>
                    <Col md='8' style={{ justifySelf: 'center' }}>
                        <Card
                            title='User Details'
                            content={
                                <form onSubmit={handleSubmit}>
                                    {message && (
                                        <p
                                            className={
                                                error
                                                    ? 'message message__error'
                                                    : 'message'
                                            }
                                        >
                                            {message}
                                        </p>
                                    )}
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Receiver Email
                                            </ControlLabel>
                                            <FormControl
                                                type='number'
                                                name='accountBalance'
                                                onChange={handleChange}
                                                placeholder='Enter receiver mail'
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Subject
                                            </ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='fullname'
                                                onChange={handleChange}
                                                value={fullname}
                                                placeholder='email subject'
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>
                                                Sender Email
                                            </ControlLabel>
                                            <FormControl
                                                name='username'
                                                type='text'
                                                value={username}
                                                onChange={handleChange}
                                                placeholder='admin@capitalgainhub.com'
                                                disabled
                                            />
                                        </FormGroup>
                                        
                                    </Row>
                                  
                                    <button
                                        className='button btn__profile'
                                        type='submit'
                                    >
                                        {props.loading
                                            ? 'Loading...'
                                            : 'Send Mail'}
                                    </button>
                                </form>
                            }
                        />
                    </Col>
                </Row>
            </Grid>

            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title={`${username} Investment`}
                            category='History'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thDepositArray.map((prop, key) => {
                                                return <th key={key}>{prop}</th>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDeposits.map((Prop, Key) => {
                                            return (
                                                <tr key={Key}>
                                                    {Object.values(Prop).map(
                                                        (prop, key) => {
                                                            return (
                                                                <td key={key}>
                                                                    {key ===
                                                                    3 ? (
                                                                        <input
                                                                            type='number'
                                                                            value={
                                                                                profit.key
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleMember(
                                                                                    e,
                                                                                    Prop
                                                                                )
                                                                            }
                                                                            name={
                                                                                key
                                                                            }
                                                                            className='member__profit'
                                                                        />
                                                                    ) : (
                                                                        prop
                                                                    )}
                                                                </td>
                                                            )
                                                        }
                                                    )}
                                                    <button
                                                        className='btn1'
                                                        onClick={() =>
                                                            updateMemberProfit(
                                                                Key
                                                            )
                                                        }
                                                    >
                                                        {props.loading
                                                            ? 'Loading...'
                                                            : 'Update Profit'}
                                                    </button>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        member: state.auth.member,
        memberDeposits: state.auth.memberDeposits,
        memberId: state.auth.memberId,
        memberWithdrawals: state.auth.memberWithdrawals,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetMember: (token, id) =>
            dispatch(orderAction.initGetMember(token, id)),
        onInitUpdateMember: (updateMemberData, token) =>
            dispatch(orderAction.initUpdateMember(updateMemberData, token)),
        onInitUpdateProfit: (updateProfitData, memberId, token) =>
            dispatch(
                orderAction.initUpdateProfit(updateProfitData, memberId, token)
            ),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendMail)
