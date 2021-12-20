import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EthereumGif from '../../../images/ethereum.png'
import BitcoinGif from '../../../images/bitcoin-gif.gif'

function Transactions(props) {
    const [latestDeposits, setLatestDeposits] = useState([])
    const [latestWithdrawals, setLatestWithdrawals] = useState([])

    useEffect(() => {
        if (props.latestDeposits) {
            setLatestDeposits(props.latestDeposits)
        }

        if (props.latestWithdrawals) {
            setLatestWithdrawals(props.latestWithdrawals)
        }
    }, [props])

    const theLatestDeposits = latestDeposits.splice(0, 10).map((d, key) => {
        const splitDate = d.updatedAt.split(',')[0]
        return (
            <div className='transactions__col' key={key}>
                <img
                    src={d.currency === 'Ethereum' ? EthereumGif : BitcoinGif}
                    alt=''
                    className='transactions__currency'
                />
                <p className='transactions__amount'>${d.amount}</p>

                <p className='transactions__date'>{splitDate}</p>
                <h4 className='transactions__name'>{d.creator}</h4>
            </div>
        )
    })
    const theLatestWithdrawals = latestWithdrawals.splice(0, 10).map((d, key) => {
        const splitDate = d.updatedAt.split(',')[0]

        return (
            <div className='transactions__col' key={key}>
                <img
                    src={d.currency === 'Ethereum' ? EthereumGif : BitcoinGif}
                    alt=''
                    className='transactions__currency'
                />
                <p className='transactions__amount'>${d.amount}</p>

                <p className='transactions__date'>{splitDate}</p>
                <h4 className='transactions__name'>{d.creator}</h4>
            </div>
        )
    })

    // let toRender = (
    //     <>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$57.00</p>

    //             <p className='transactions__date'>Oct-28-2020</p>
    //             <h4 className='transactions__name'>Francis1</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$853.00</p>

    //             <p className='transactions__date'>Oct-28-2020</p>
    //             <h4 className='transactions__name'>Peter107</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$902.00</p>

    //             <p className='transactions__date'>Oct-28-2020</p>
    //             <h4 className='transactions__name'>Reginald89</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$5392.00</p>

    //             <p className='transactions__date'>Oct-28-2020</p>
    //             <h4 className='transactions__name'>Angelia</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$892.00</p>

    //             <p className='transactions__date'>Oct-27-2020</p>
    //             <h4 className='transactions__name'>Bahk103</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$719.00</p>

    //             <p className='transactions__date'>Oct-27-2020</p>
    //             <h4 className='transactions__name'>Stephen01</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$3092.00</p>

    //             <p className='transactions__date'>Oct-27-2020</p>
    //             <h4 className='transactions__name'>Lee</h4>
    //         </div>
    //         <div className='transactions__col'>
    //             <img
    //                 src={BitcoinGif}
    //                 alt=''
    //                 className='transactions__currency'
    //             />
    //             <p className='transactions__amount'>$112.00</p>

    //             <p className='transactions__date'>Oct-26-2020</p>
    //             <h4 className='transactions__name'>AslanLion</h4>
    //         </div>
    //     </>
    // )

    return (
        <>
            <div className='transactions'>
                <h4 className='heading-4 transactions__heading mb-sm'>
                    Latest Deposits
                </h4>
                {theLatestDeposits}
            </div>
            <div className='transactions'>
                <h4 className='heading-4 transactions__heading mb-sm'>
                    Latest Withdrawals
                </h4>
                {theLatestWithdrawals}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        latestWithdrawals: state.auth.latestWithdrawals,
        latestDeposits: state.auth.latestDeposits,
    }
}

export default connect(mapStateToProps)(Transactions)
