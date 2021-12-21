import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Row,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
} from 'react-bootstrap'

import { Card } from '../../components/Card/Card'

import * as orderAction from '../../store/actions/burgerIndex'

const SendEmail = (props) => {
    const [senderEmail, setSenderEmail] = useState('admin@capitalgainhub.com')
    const [receiverEmail, setReceiverEmail] = useState('')
    const [emailSubject, setEmailSubject] = useState('')
    const [emailMessage, setEmailMessage] = useState('')

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'receiverEmail') {
            setReceiverEmail(value)
        }
        if (name === 'emailSubject') {
            setEmailSubject(value)
        }
        if (name === 'emailMessage') {
            setEmailMessage(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(receiverEmail === '' || emailSubject === '' || emailMessage === ''){
            setError(true)
            setMessage('fields cannot be empty')
        }

        else{
            setError(false)
            setMessage(null)
        }
        const formData = {
            senderEmail,
            receiverEmail,
            emailSubject,
            emailMessage,
        }

        props.onInitSendEmail(formData, props.tokenId)
    }

    return (
        <div className='center' style={{ margin: '2rem 0' }}>
            <Grid fluid>
                <Row style={{ display: 'grid' }}>
                    <Col md={8} sm={12} style={{ justifySelf: 'center' }}>
                        <Card
                            title='Send an Email'
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
                                                type='email'
                                                name='receiverEmail'
                                                onChange={handleChange}
                                                value={receiverEmail}
                                                placeholder='Enter receiver mail'
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>Subject</ControlLabel>
                                            <FormControl
                                                type='text'
                                                name='emailSubject'
                                                onChange={handleChange}
                                                value={emailSubject}
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
                                                name='senderEmail'
                                                type='email'
                                                value={senderEmail}
                                                placeholder='admin@capitalgainhub.com'
                                                disabled
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup className='col-md-12 col-sm-12 col-xs-12'>
                                            <ControlLabel>Message</ControlLabel>
                                            <FormControl
                                                componentClass='textarea'
                                                name='emailMessage'
                                                rows={4}
                                                value={emailMessage}
                                                placeholder='Type the message you want to send'
                                                onChange={handleChange}
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        emailStatus: state.user.emailStatus,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitSendEmail: (emailData, token) =>
            dispatch(
                orderAction.initSendEmail(emailData, token)
            ),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendEmail)
