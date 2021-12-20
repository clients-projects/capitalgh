import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { CgCalendarDates } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import LogoName from '../../images/logoName.png'

import GetCurrentDate from '../../util/getCurrentDate'

function SubHeader(props) {
    const [checked, setChecked] = useState(false)

    const collapseMenu = () => {
        setChecked((old) => !old)
    }

    const auth = props.auth

    let mobileNav = (
        <>
            <li className='navigation__item'>
                <Link
                    to='/Auth/login'
                    className='navigation__link navigation__link--auth'
                    onClick={() => {
                        collapseMenu()
                    }}
                >
                    Login
                </Link>
            </li>
            <li className='navigation__item'>
                <Link
                    to='/Auth/signup'
                    className='navigation__link navigation__link--auth'
                    onClick={() => {
                        collapseMenu()
                    }}
                >
                    Signup
                </Link>
            </li>
        </>
    )

    let nav = (
        <>
            <Link
                to='/Auth/login'
                className='subHeader__list--item subHeader__list-item--auth'
            >
                <li>login</li>
            </Link>
            <Link
                to='/Auth/signup'
                className='subHeader__list--item subHeader__list-item--auth'
            >
                <li>signup</li>
            </Link>
        </>
    )

    if (auth) {
        mobileNav = (
            <>
                <li className='navigation__item'>
                    <Link
                        to='/admin/dashboard'
                        className='navigation__link navigation__link--auth'
                        onClick={() => {
                            collapseMenu()
                        }}
                    >
                        Dashboard
                    </Link>
                </li>
            </>
        )

        nav = (
            <>
                <Link
                    to='/admin/dashboard'
                    className='subHeader__list--item subHeader__list-item--auth'
                >
                    <li>Dashboard</li>
                </Link>
            </>
        )
    }

    return (
        <>
            <div className='navigation'>
                <input
                    onChange={() => console.log('changed')}
                    onClick={() => {
                        collapseMenu()
                    }}
                    checked={checked}
                    type='checkbox'
                    className='navigation__checkbox'
                    id='navi-toggle'
                />
                <label htmlFor='navi-toggle' className='navigation__button'>
                    <span className='navigation__icon'></span>
                </label>
                <div className='navigation__background'>&nbsp;</div>
                <nav className='navigation__nav'>
                    <ul className='navigation__list'>
                        <li className='navigation__item'>
                            <Link
                                to='/'
                                className='navigation__link'
                                onClick={() => {
                                    collapseMenu()
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li className='navigation__item'>
                            <Link
                                to='/about-us'
                                className='navigation__link'
                                onClick={() => {
                                    collapseMenu()
                                }}
                            >
                                About Us
                            </Link>
                        </li>
                        <li className='navigation__item'>
                            <Link
                                to='/how-to-buy-bitcoin'
                                className='navigation__link'
                                onClick={() => {
                                    collapseMenu()
                                }}
                            >
                                How to buy Bitcoin
                            </Link>
                        </li>
                        <li className='navigation__item'>
                            <Link
                                to='/faq'
                                className='navigation__link'
                                onClick={() => {
                                    collapseMenu()
                                }}
                            >
                                FAQ
                            </Link>
                        </li>
                        <li className='navigation__item'>
                            <Link
                                to='/contact-us'
                                className='navigation__link'
                                onClick={() => {
                                    collapseMenu()
                                }}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>

                    <ul className='navigation__list navigation__list--auth'>
                        {mobileNav}
                    </ul>
                </nav>
            </div>

            <div className='subHeader__contact'>
                <CgCalendarDates className='subHeader__contact--logo' />
                <div className='subHeader__contact--text'>
                    <GetCurrentDate />
                </div>

                <IoLogoWhatsapp className='subHeader__contact--logo' />
                <p className='subHeader__contact--text'>+14049071212</p>

                <MdEmail className='subHeader__contact--logo' />
                <p className='subHeader__contact--text'>
                    support@fxcryptotokeninvestment.com
                </p>
            </div>

            <nav className='subHeader__nav'>
                <Link className='subHeader__logo' to='/'>
                    <img
                        src={LogoName}
                        alt='logoname'
                        className='subHeader__logo--item'
                    />
                </Link>
                <ul className='subHeader__list'>
                    <Link to='/' className='subHeader__list--item'>
                        <li>home</li>
                    </Link>
                    <Link to='/about-us' className='subHeader__list--item'>
                        <li>About</li>
                    </Link>
                    <Link
                        to='/how-to-buy-bitcoin'
                        className='subHeader__list--item'
                    >
                        <li>How to buy Bitcoin</li>
                    </Link>
                    <Link to='/faq' className='subHeader__list--item'>
                        <li>FAQ</li>
                    </Link>
                    <Link to='/contact-us' className='subHeader__list--item'>
                        <li>Contact Us</li>
                    </Link>
                </ul>
                <ul className='subHeader__list--auth'>{nav}</ul>
            </nav>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.tokenId,
    }
}

export default connect(mapStateToProps)(SubHeader)
