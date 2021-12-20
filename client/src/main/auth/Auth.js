import React from 'react'

const Auth = (props) => {
    let messageCheck = false

    if (props.message) {
        if (
            Object.keys(props.message)[0] === 'error' ||
            Object.keys(props.message)[0] === 'success'
        ) {
            if (Object.values(props.message)[0] !== null) {
                messageCheck = true
            }
        } else {
            messageCheck = false
        }
    }

    let messageToDisplay = messageCheck ? Object.values(props.message) : null

    const messageStyle = {
        display: messageToDisplay ? 'block' : 'none',
    }

    const authMessage = ['auth__message']

    if (messageToDisplay && props.message.error) {
        authMessage.length > 1
            ? authMessage.pop() && authMessage.push('auth__message--error')
            : authMessage.push('auth__message--error')
    }

    if (messageToDisplay && props.message.success) {
        authMessage.length > 1
            ? authMessage.pop() && authMessage.push('auth__message--success')
            : authMessage.push('auth__message--success')
    }

    return (
        <section
            className={props.login ? 'auth-form auth-form__login' : 'auth-form'}
        >
            <p className={authMessage.join(' ')} style={messageStyle}>
                {messageToDisplay}
            </p>
            {props.children}
        </section>
    )
}

export default Auth
