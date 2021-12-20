import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thInvestmentRequestArray = [
    'No',
    'Username',
    'Amount',
    'Plan',
    'Currency',
    'Status',
    'Date',
]

const PendingDeposits = (props) => {
    const [userPendingDeposit, setUserPendingDeposit] = useState([])
    const [loadedDeposits, setLoadedDeposits] = useState(false)

    const gottenUserPendingDeposit = useRef()
    useEffect(() => {
        if (!gottenUserPendingDeposit.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenUserPendingDeposit.current = true
        } else {
            if (props.pendingDeposit) {
                setUserPendingDeposit(props.pendingDeposit)
            }
        }
    }, [props, userPendingDeposit])

    useEffect(() => {
        if (userPendingDeposit.length > 0) {
            setLoadedDeposits(true)
        }
    }, [userPendingDeposit])

    const handleApproval = (id) => {
        for (let i = 0; i < props.idsOfPendingDeposits.length; i++) {
            if (id === i) {
                return props.onInitInvestNowApproval(
                    props.idsOfPendingDeposits[i]._id,
                    props.tokenId
                )
            }
        }
    }

   
    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title='Investment Requests'
                            category='Users that want to purchase a package'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thInvestmentRequestArray.map(
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
                                        {userPendingDeposit.map((prop, key) => {
                                            
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
                                                    <button
                                                        className={
                                                            loadedDeposits &&
                                                            prop.status ===
                                                                'Approved'
                                                                ? 'btn1 btn1__approved'
                                                                : 'btn1'
                                                        }
                                                        onClick={() =>
                                                            handleApproval(key)
                                                        }
                                                    >
                                                        {props.loading
                                                            ? 'Loading...'
                                                            : loadedDeposits &&
                                                              prop.status ===
                                                                  'Approved'
                                                            ? 'approved'
                                                            : 'approve'}
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
        fundLoading: state.fundAccount.loading,
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        investNowApprovalSuccess: state.fundAccount.fundAccountApprovalSuccess,
        idsOfPendingDeposits: state.fundAccount.idsOfPendingDeposits,
        pendingDeposit: state.fundAccount.pendingDeposit,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
        onInitInvestNowApproval: (id, token) =>
            dispatch(actions.initInvestNowApproval(id, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingDeposits)
