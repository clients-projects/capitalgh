import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../../images/logo.png'
import Bitcoin from '../../../images/bitcoin.png'
import Dash from '../../../images/dash.png'
import Dogecoin from '../../../images/dogecoin.png'
import Ethereum from '../../../images/ethereum.png'
import Litecoin from '../../../images/litecoin.png'
import Payeer from '../../../images/payeer.png'
import PerfectMoney from '../../../images/perfectMoney.png'

function Header() {
    return (
        <>
            <img src={Logo} alt='' className='main-header__logo' />
            <h3 className='heading-3 main-header__text'>
                Large auctions. Huge profit
            </h3>
            <h1 className='heading-1 main-header__title'>
                Welcome to fxcryptotokeninvestment.com
            </h1>

            <div className='main-header__cta'>
                <Link to='/Auth/login' className='button main-header__button'>
                    Sign In
                </Link>
                <Link to='/Auth/signup' className='button main-header__button'>
                    Open an account
                </Link>
            </div>
            <div className='main-header__seen-on'>We Accept</div>
            <div className='main-header__logos'>
                <img src={Bitcoin} alt='' className='main-header__item' />
                <img src={Ethereum} alt='' className='main-header__item' />
                <img src={Dogecoin} alt='' className='main-header__item' />
                <img src={Dash} alt='' className='main-header__item' />
                <img src={Payeer} alt='' className='main-header__item' />
                <img src={PerfectMoney} alt='' className='main-header__item' />
                <img src={Litecoin} alt='' className='main-header__item' />
            </div>
        </>
    )
}

export default Header
