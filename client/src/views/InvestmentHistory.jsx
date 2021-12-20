import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as orderAction from '../store/actions/burgerIndex'

import Card from '../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thInvestmentHistoryArray = ['No', 'Package', 'amount', 'Profit', 'Date']


const InvestmentHistory = (props) => {
    const [getDepositHistory, setDepositHistory] = useState([])

    const gottenDepositHistory = useRef()
    useEffect(() => {
        if (!gottenDepositHistory.current) {
            if (props.tokenId) {
                props.onInitGetUserHistory(props.tokenId)
            }
            gottenDepositHistory.current = true
        } else {
            if (props.getUserDepositHistory) {
                setDepositHistory(props.getUserDepositHistory)
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
                            title='Your Investment'
                            category='History'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thInvestmentHistoryArray.map(
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
                                        {getDepositHistory.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {Object.values(prop).map(
                                                        (prop, key) => {
                                                            return (
                                                                <td key={key}>
                                                                    {prop}
                                                                </td>
                                                            )
                                                        }
                                                    )}
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
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        getUserDepositHistory: state.user.getUserDepositHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUserHistory: (token) =>
            dispatch(orderAction.initGetUserHistory(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InvestmentHistory)
