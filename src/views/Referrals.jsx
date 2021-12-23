import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import * as orderAction from '../store/actions/burgerIndex'
import avatar from '../assets/img/faces/face-1.jpg'

const Referrals = (props) => {
    return (
        <Grid fluid>
            
            <Row style={{ display: 'grid' }}>
                <Col md='12' xs='12' className='referrals'>
                    <h2 className='referrals__heading'>REFERRALS</h2>

                    <div className='referrals__box'>
                        <div className='referrals__primary'>
                            <img
                                src={avatar}
                                alt='avatar'
                                className='referrals__primary--img'
                            />

                            <p className='referrals__primary--title'>
                                {' '}
                                Your Upline:{' '}
                                <span className='referrals__primary--subtitle'>
                                    {' '}
                                    {props.upline}
                                </span>
                            </p>
                        </div>
                        <div className='referrals__secondary'>
                            <div className='referrals__secondary--item'>
                                <span>
                                    Total referral comission:{' '}
                                    <b>${props.totalReferralCommission}</b>
                                </span>
                            </div>
                            <div className='referrals__secondary--item'>
                                <span>
                                    Referrals: <b>{props.totalReferrals}</b>
                                </span>
                            </div>
                            <div className='referrals__secondary--item'>
                                <span>
                                    Active referrals:{' '}
                                    <b>{props.activeReferrals}</b>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className='referrals__link'
                    >
                        <div className='referrals__link--box'>
                         
                            <span className='referrals__link--title'>
                                referal link:{' '}
                            </span>
                            <Link to='referrals' id='linkRef'>
                                {props.userData.referralLink}{' '}
                            </Link>
                        </div>

                        <CopyToClipboard
                            text={props.userData.referralLink}
                            onCopy={() => console.log('copied')}
                        >
                            <button
                                className='btn1 referrals__link--btn'
                                data-clipboard-target='#linkRef'
                            >
                                Copy Link
                            </button>
                        </CopyToClipboard>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        upline: state.auth.userData.upline,
        referrals: state.auth.userData.referrals,
        userData: state.auth.userData,

        activeReferrals: state.auth.userData.activeReferrals,
        totalReferrals: state.auth.userData.totalReferrals,
        totalReferralCommission: state.auth.userData.totalReferralCommission,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUserHistory: (token) =>
            dispatch(orderAction.initGetUserHistory(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Referrals)
