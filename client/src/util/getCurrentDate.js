import React from 'react'

const getCurrentDate = () => {
    let newDate = new Date()

    const out = newDate.toLocaleString('en-GB', { minute: 'numeric', month: 'long', weekday: 'long', hour: 'numeric', hour12: true })


    return <p>{out}</p>
}

export default getCurrentDate
