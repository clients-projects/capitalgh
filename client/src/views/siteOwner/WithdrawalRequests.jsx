import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thWithdrawalArray = [
    'No',
    'Username',
    'Amount',
    'Currency',
    'Status',
    'Date',
]

const PendingWithdrawals = (props) => {
    const [userPendingWithdrawal, setUserPendingWithdrawal] = useState([])
        const [loadedWithdrawals, setLoadedWithdrawals] = useState(false)

    const gottenUserPendingWithdrawal = useRef()
    useEffect(() => {
        if (!gottenUserPendingWithdrawal.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenUserPendingWithdrawal.current = true
        } else {
            if (props.pendingWithdrawal) {
                setUserPendingWithdrawal(props.pendingWithdrawal)
            }
        }
    }, [props])

      useEffect(() => {
          if (userPendingWithdrawal.length > 0) {
              setLoadedWithdrawals(true)
          }
      }, [userPendingWithdrawal])

    const handleApproval = (id) => {
        for (let i = 0; i < props.idsOfPendingWithdrawals.length; i++) {
            if (id === i) {
                return props.onInitWithdrawNowApproval(
                    props.idsOfPendingWithdrawals[i]._id,
                    props.tokenId
                )
            }
        }
    }

    // if (props.investNowApprovalSuccess) {
    //     console.log('the approval', props.investNowApprovalSuccess)
    // }
    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title='Withdrawal Requests'
                            category='Users that want to purchase a plan'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thWithdrawalArray.map(
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
                                        {userPendingWithdrawal.map((prop, key) => {
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
                                                            loadedWithdrawals &&
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
                                                            : loadedWithdrawals &&
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
        withdrawNowApprovalSuccess: state.fundAccount.fundAccountApprovalSuccess,
        idsOfPendingWithdrawals: state.fundAccount.idsOfPendingWithdrawals,
        pendingWithdrawal: state.fundAccount.pendingWithdrawal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
        onInitWithdrawNowApproval: (id, token) =>
            dispatch(actions.initWithdrawNowApproval(id, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingWithdrawals)
