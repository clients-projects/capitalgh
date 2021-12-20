import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { CgCalendarDates } from 'react-icons/cg'
import {
    BsFillPersonPlusFill,
    BsFillPersonDashFill,
    BsFillPersonCheckFill,
} from 'react-icons/bs'
import { ImDownload, ImUpload } from 'react-icons/im'

const Activities = (props) => {
   
    const [siteTotalPaidOut, setSiteTotalPaidOut] = useState(202, 542, 420)
    const [siteTotalInvestments, setSiteTotalInvestments] = useState(342, 322, 523)
    const [newestMember, setNewestMember] = useState('Lawson2')
    const [lastDepositName, setLastDepositName] = useState('Micheal04')
    const [lastDepositAmount, setLastDepositAmount] = useState('3,224')
    const [lastWithdrawalAmount, setLastWithdrawalAmount] = useState('9,032')
    const [lastWithdrawalName, setLastWithdrawalName] = useState('Johnson')


    useEffect(() => {
        if (props.activities) {
            const activity = props.activities

            setSiteTotalPaidOut(activity.siteTotalPaidOut)
            setSiteTotalInvestments(activity.siteTotalInvestments)
            setNewestMember(activity.newestMember)
            setLastDepositName(activity.lastDepositName)
            setLastDepositAmount(activity.lastDepositAmount)
            setLastWithdrawalAmount(activity.lastWithdrawalAmount)
            setLastWithdrawalName(activity.lastWithdrawalName)

         

        }


    }, [props.activities])

     // siteTotalInvestments = siteTotalInvestments.toLocaleString()

     
     
     return (
         <>

        
            <div className='activities'>
                <div className='activity'>
                    <CgCalendarDates className='activity__icon' />
                    <h2 className='heading-4__light'>Started Date</h2>
                    <h3 className='heading-4__dark activity__text'>july 5, 2010</h3>
                </div>
             
                <div className='activity'>
                    <BsFillPersonCheckFill className='activity__icon' />
                    <h2 className='heading-4__light'>Newest Member</h2>
                    <h3 className='heading-4__dark activity__text'>{newestMember}</h3>
                </div>
                <div className='activity'>
                    <BsFillPersonDashFill className='activity__icon' />
                    <h2 className='heading-4__light'>Total paid out</h2>
                    <h3 className='heading-4__dark activity__text'>${siteTotalPaidOut? siteTotalPaidOut.toLocaleString() : siteTotalPaidOut}</h3>
                </div>
                <div className='activity'>
                    <BsFillPersonPlusFill className='activity__icon' />
                    <h2 className='heading-4__light'>Total Investments</h2>
                    <h3 className='heading-4__dark activity__text'>${siteTotalInvestments ? siteTotalInvestments.toLocaleString() : siteTotalInvestments}+</h3>
                </div>
                <div className='activity'>
                    <ImDownload className='activity__icon' />
                    <h2 className='heading-4__light'>Last Deposit</h2>
                    <h3
                        className='heading-4__dark activity__text'
                        style={{ textTransform: 'uppercase' }}
                    >
                        ${lastDepositAmount ? lastDepositAmount.toLocaleString(): lastDepositAmount} ({lastDepositName})
                    </h3>
                </div>
                <div className='activity'>
                    <ImUpload className='activity__icon' />
                    <h2 className='heading-4__light'>Last withdrawal</h2>
                    <h3
                        className='heading-4__dark activity__text'
                        style={{ textTransform: 'uppercase' }}
                    >
                        ${lastWithdrawalAmount ? lastWithdrawalAmount.toLocaleString() : lastWithdrawalAmount} ({lastWithdrawalName})
                    </h3>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        activities: state.auth.activities,
    }
}

export default connect(mapStateToProps)(Activities)
