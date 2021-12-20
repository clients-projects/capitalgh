import React from 'react'

function PlanConfirmation(props) {
    const { amountToDeposit, currency } = props.location.state
    let {
        name,
        percent,
        duration
    } = props.location.state.planDetails
      


    let walletAddress
    if (currency === 'Bitcoin') {
       walletAddress = props.location.state.adminBitcoinAddress
    } else if (currency === 'Ethereum') {
       walletAddress = props.location.state.adminEthereumAddress
    }

    return (
        <div className='deposit'>
            <h3 className='deposit__heading'>Deposit Confirmation</h3>
            <div className='deposit__info'>
                <p className='deposit__info--left'>Plan</p>
                <p
                    className='deposit__info--right'
                    style={{ textTransform: 'uppercase' }}
                >
                    {name}
                </p>
                <p className='deposit__info--left'>Profit</p>
                <p className='deposit__info--right'>{`${percent}% for ${duration}`}</p>
                <p className='deposit__info--left'>Principal Return</p>
                <p className='deposit__info--right'>Yes</p>
                <p className='deposit__info--left'>Principal Withdraw</p>
                <p className='deposit__info--right'>Available with 0.00% fee</p>
                <p className='deposit__info--left'>Credit Amount</p>
                <p className='deposit__info--right'>{`${amountToDeposit}.00`}</p>
                <p className='deposit__info--left'>Deposit Fee</p>
                <p className='deposit__info--right'>
                    0.00% + $0.00 (min. $0.00 max. $0.00)
                </p>
                <p className='deposit__info--left'>Order Status</p>
                <p className='deposit__info--right'>Pending </p>
            </div>
            <h4 className='deposit__info--instruction'>
                {amountToDeposit ? (
                    `
                INSTRUCTION: Please send $${amountToDeposit} worth of ${currency} to 
                "${walletAddress}"`
                ) : (
                    <span style={{ color: '#ff6969' }}>
                        Invalid amount, Please enter an amount
                    </span>
                )}
            </h4>
        </div>
    )
}

export default PlanConfirmation
