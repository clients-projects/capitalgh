import React from 'react'
import { Link } from 'react-router-dom'

import { AiFillPhone } from 'react-icons/ai'
import { ImLocation2 } from 'react-icons/im'
import { IoLogoWhatsapp } from 'react-icons/io'

function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <div className='footer'>
                <div className='footer__col'>
                    <h4 className='heading-4__light footer__header'>
                        Useful Links
                    </h4>
                    <ul className='footer__list'>
                        <Link to='/terms' className='footer__link'>
                            {' '}
                            <li>Terms and Conditions</li>
                        </Link>
                        <Link to='/about-us' className='footer__link'>
                            {' '}
                            <li>About Us</li>
                        </Link>
                        <Link to='/contact-us' className='footer__link'>
                            {' '}
                            <li>Contact Us</li>
                        </Link>
                    </ul>
                </div>
                <div className='footer__col'>
                    <h4 className='heading-4__light footer__header'>
                        Company Info
                    </h4>
                    <ul className='footer__list'>
                        <li className='footer__list--item'>
                            THE REDWOOD SUPPLIER (FL) LIMITED
                        </li>
                        <li className='footer__list--item'>
                            FINNISH COMPANY #10594357
                        </li>
                    </ul>
                </div>
                <div className='footer__col'>
                    <h4 className='heading-4__light footer__header'>
                        contact Us
                    </h4>
                    <ul className='footer__list'>
                        <li
                            className='footer__list--item'
                            style={{ textTransform: 'uppercase' }}
                        >
                            <ImLocation2 className='footer__list--icon' />
                            Downtown Atlanta, 235 Peachtree Street NE, Atlanta,
                            GA 30303, USA{' '}
                        </li>
                        <li className='footer__list--item'>
                            <IoLogoWhatsapp className='footer__list--icon' />
                            +14049071212
                        </li>
                        <li className='footer__list--item'>
                            <AiFillPhone className='footer__list--icon' />
                            +14049071212
                        </li>
                    </ul>
                </div>
            </div>

            <div className='footer__copyright'>
                <p className='footer__copy'>
                    copyright &copy; {year} fxcryptotokeninvestment.com all
                    rights reserved
                </p>
            </div>
        </>
    )
}

export default Footer
