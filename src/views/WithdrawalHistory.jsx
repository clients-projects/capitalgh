import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as orderAction from '../store/actions/burgerIndex'

import Card from '../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thInvestmentHistoryArray = [
    'No',
    'amount',
    'Currency',
    'Date',
]

const Members = (props) => {
    const [getWithdrawalHistory, setWithdrawalHistory] = useState([])

    const gottenWithdrawalHistory = useRef()
    useEffect(() => {
        if (!gottenWithdrawalHistory.current) {
            if (props.tokenId) {
                props.onInitGetUserHistory(props.tokenId)
            }
            gottenWithdrawalHistory.current = true
        } else {
            if (props.getUserWithdrawalHistory) {
                setWithdrawalHistory(props.getUserWithdrawalHistory)
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
                                        {getWithdrawalHistory.map(
                                            (prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(
                                                            prop
                                                        ).map((prop, key) => {
                                                            return (
                                                                <td key={key}>
                                                                    {prop}
                                                                </td>
                                                            )
                                                        })}
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
        loading: state.user.loading,
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        getUserWithdrawalHistory: state.user.getUserWithdrawalHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUserHistory: (token) =>
            dispatch(orderAction.initGetUserHistory(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Members)
