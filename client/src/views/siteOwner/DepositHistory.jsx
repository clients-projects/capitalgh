import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thDepositHistoryArray = [
    'No',
    'Username',
    'Amount',
    'Plan',
    'Date'
]




const AllUsersDepositHistory = (props) => {
    const [allUsersDeposit, setAllUsersDeposit] = useState([])

    const gottenAllUsersDeposit = useRef()
    useEffect(() => {
        if (!gottenAllUsersDeposit.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenAllUsersDeposit.current = true
        } else {
            if (props.allUsersDeposit) {
                setAllUsersDeposit(props.allUsersDeposit)
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
                            title='Users Deposits'
                            category='Deposit History of all the users'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thDepositHistoryArray.map(
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
                                        {allUsersDeposit.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {Object.values(prop).map(
                                                        (prop) => {
                                                            return (
                                                                <td key={key}>
                                                                    {prop}
                                                                </td>
                                                            )
                                                        }
                                                    )}

                                                    {/* <button className='btn1'>
                                                        view
                                                    </button> */}
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
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        allUsersDeposit: state.fundAccount.allUsersDeposit,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUsersDepositHistory)
