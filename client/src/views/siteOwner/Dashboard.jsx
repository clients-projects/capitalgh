import React, { useEffect, useState } from 'react'
import ChartistGraph from 'react-chartist'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import { Card } from '../../components/Card/Card'
import { StatsCard } from '../../components/StatsCard/StatsCard'
import { dataPie, legendPie } from '../../variables/Variables'

import * as actions from '../../store/actions/burgerIndex'
import CrytoMarketWatch from '../../tradeviewWidgets/CryptoMarketWatch'

const Dashboard = (props) => {
    const [totalReceivedAmount, setTotalReceivedAmount] = useState(0)
    const [totalDisbursedAmount, setTotalDisbursedAmount] = useState(0)
    const [pendingWithdrawalsCount, setPendingWithdrawalsCount] = useState(0)
    const [pendingDepositsCount, setPendingDepositsCount] = useState(0)

    const createLegend = (json) => {
        var legend = []
        for (var i = 0; i < json['names'].length; i++) {
            var type = 'fa fa-circle text-' + json['types'][i]
            legend.push(<i className={type} key={i} />)
            legend.push(' ')
            legend.push(json['names'][i])
        }
        return legend
    }

    useEffect(() => {
        if (props.tokenId) {
            props.onInitGetFunds(props.tokenId)
        }

        if (props.totalReceivedAmount) {
            setTotalDisbursedAmount(props.totalDisbursedAmount)
            setTotalReceivedAmount(props.totalReceivedAmount)
            setPendingDepositsCount(props.pendingDepositsCount)
            setPendingWithdrawalsCount(props.pendingWithdrawalsCount)
        }

        console.log('received amount', props.totalReceivedAmount)
    }, [props])

    console.log({totalReceivedAmount})

    const displayDisbursed =  `$${totalDisbursedAmount}`
    const displayReceived = `$${totalReceivedAmount}`
    const displayWithdrawalsCount = pendingWithdrawalsCount
    const displayDepositsCount = pendingDepositsCount

    console.log({displayReceived})

    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={
                                <i className='pe-7s-server text-warning' />
                            }
                            statsText='Total Funds Disbursed'
                            statsValue= {displayDisbursed}
                            statsIcon={<i className='fa fa-refresh' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={
                                <i className='pe-7s-wallet text-success' />
                            }
                            statsText='Total Funds received'
                            statsValue={displayReceived}
                            statsIcon={<i className='fa fa-calendar-o' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={<i className='pe-7s-graph1 text-danger' />}
                            statsText='Withdrawal Requests'
                            statsValue= {displayWithdrawalsCount}
                            statsIcon={<i className='fa fa-clock-o' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                    <Col lg={3} sm={6}>
                        <StatsCard
                            bigIcon={<i className='pe-7s-cash text-info' />}
                            statsText='Investment Requests'
                            statsValue= {displayDepositsCount}
                            statsIcon={<i className='fa fa-refresh' />}
                            statsIconText='Updated now'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '4rem' }}>
                    <Col md={8}>
                        <div style={{ height: '70vh' }}>
                            <CrytoMarketWatch />
                        </div>
                    </Col>
                    <Col md={4}>
                        <Card
                            statsIcon='fa fa-clock-o'
                            title='Transactions'
                            category='investment activities'
                            stats='Updated now'
                            content={
                                <div
                                    id='chartPreferences'
                                    className='ct-chart ct-perfect-fourth'
                                >
                                    <ChartistGraph data={dataPie} type='Pie' />
                                </div>
                            }
                            legend={
                                <div className='legend'>
                                    {createLegend(legendPie)}
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log({state})
    return {
        err: state.auth.error,
        loading: state.user.loading,
        redirectToLoginPage: state.auth.redirect,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        totalReceivedAmount: state.auth.totalReceivedAmount,
        totalDisbursedAmount: state.auth.totalDisbursedAmount,
        pendingDepositsCount: state.auth.pendingDepositsCount,
        pendingWithdrawalsCount: state.auth.pendingWithdrawalsCount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
