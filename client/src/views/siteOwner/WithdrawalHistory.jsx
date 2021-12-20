import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thWithdrawalHistoryArray = [
    'No',
    'Username',
    'Amount',
    'Currency',
    'Date',
]

const AllUsersWithdrawalHistory = (props) => {
    const [allUsersWithdrawal, setAllUsersWithdrawal] = useState([])

    const gottenAllUsersWithdrawal = useRef()
    useEffect(() => {
        if (!gottenAllUsersWithdrawal.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenAllUsersWithdrawal.current = true
        } else {
            if (props.allUsersWithdrawal) {
                setAllUsersWithdrawal(props.allUsersWithdrawal)
            }
        }
    }, [props])

    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title='Users Withdrawals'
                            category='Withdrawal History of all the users'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thWithdrawalHistoryArray.map(
                                                (prop, key) => {
                                                    return (
                                                        <th key={key}>
                                                            {prop}
                                                        </th>
                                                    )
                                                }
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsersWithdrawal.map(
                                            (prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(
                                                            prop
                                                        ).map((prop) => {
                                                            return (
                                                                <td key={key}>
                                                                    {prop}
                                                                </td>
                                                            )
                                                        })}
                                                       
                                                        {/* <button className='btn1'>
                                                        view
                                                    </button> */}
                                                    </tr>
                                                )
                                            }
                                        )}
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
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        allUsersWithdrawal: state.fundAccount.allUsersWithdrawal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersWithdrawalHistory)
