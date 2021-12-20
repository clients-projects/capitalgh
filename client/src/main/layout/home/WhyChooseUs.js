import React from 'react'

import { SiAdguard } from 'react-icons/si'
import { BiSupport } from 'react-icons/bi'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { MdAccountBalanceWallet, MdPeople } from 'react-icons/md'
import { CgInternal } from 'react-icons/cg'

function WhyChooseUs() {
    return (
        <div className='whyChooseUs'>
            <h2 className='whyChooseUs__heading'>Why Choose Us</h2>

            <div className='whyChooseUs__items'>
                <div className='whyChooseUs__box'>
                    <SiAdguard className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>DDOS Guard</h2>
                    <h3 className='whyChooseUs__text'>
                        We keep your transactions secured and protected at all
                        times
                    </h3>
                </div>
                <div className='whyChooseUs__box'>
                    <AiOutlineAreaChart className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>Profitable Plan</h2>
                    <h3 className='whyChooseUs__text'>
                        Reliable daily earning with our advance profitable
                        investment plan. Join and start earning !
                    </h3>
                </div>
                <div className='whyChooseUs__box'>
                    <MdPeople className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>
                        Experienced Management
                    </h2>
                    <h3 className='whyChooseUs__text'>
                        fxcryptotokeninvestment.com is managed by a team with
                        years of experience{' '}
                    </h3>
                </div>
                <div className='whyChooseUs__box'>
                    <BiSupport className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>Support</h2>
                    <h3 className='whyChooseUs__text'>
                        In order to ensure the quality and efficiency of our
                        business, we support each of our customers
                    </h3>
                </div>
                <div className='whyChooseUs__box'>
                    <CgInternal className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>Internal Audit</h2>
                    <h3 className='whyChooseUs__text'>
                        Auditing services are designed to help your risk
                        minimization
                    </h3>
                </div>
                <div className='whyChooseUs__box'>
                    <MdAccountBalanceWallet className='whyChooseUs__icon' />
                    <h2 className='whyChooseUs__title'>Accurate Accouting</h2>
                    <h3 className='whyChooseUs__text'>
                        The complex is designed to ensure the timely preparation
                        of payments
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs
