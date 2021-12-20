import React from 'react'
import {Link} from 'react-router-dom'

function Plans() {
    return (
        <>
            <div className='plans__heading'>
                <h1 className='plans__heading--text heading-1'>
                    Our Investment Plans
                </h1>
            </div>
            <div className='plans__category'>
                <h1>Daily investment packages</h1>
            </div>
            <div className='plans'>
                {' '}
                <div className='plan'>
                    <h2 className='plan__title'>starter</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            2% <span className='plan__icon-span'>/daily</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $300
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $4,999
                        </li>
                        <li className='plan__list-item'>2% daily profit</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Amateur</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            3% <span className='plan__icon-span'>/daily</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $5000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $9,999
                        </li>
                        <li className='plan__list-item'>3% daily profit</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Professional</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            4% <span className='plan__icon-span'>/daily</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $10000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $49,999
                        </li>
                        <li className='plan__list-item'>4% daily profit</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
            </div>
            <div className='plans__category'>
                <h1>Weekly investment packages</h1>
            </div>
            <div className='plans'>
                {' '}
                <div className='plan'>
                    <h2 className='plan__title'>Helm</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            10% <span className='plan__icon-span'>/Weekly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $300
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $4,999
                        </li>
                        <li className='plan__list-item'>10% Weekly profit</li>
                        <li className='plan__list-item'>10% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Premium</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            15% <span className='plan__icon-span'>/Weekly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $5000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $9,999
                        </li>
                        <li className='plan__list-item'>15% Weekly profit</li>
                        <li className='plan__list-item'>10% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Business</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            20% <span className='plan__icon-span'>/Weekly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $10000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $49,999
                        </li>
                        <li className='plan__list-item'>20% Weekly profit</li>
                        <li className='plan__list-item'>10% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
            </div>
            <div className='plans__category'>
                <h1>Monthly investment packages</h1>
            </div>
            <div className='plans'>
                {' '}
                <div className='plan'>
                    <h2 className='plan__title'>Silver</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            44% <span className='plan__icon-span'>/monthly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $300
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $4,999
                        </li>
                        <li className='plan__list-item'>44% monthly profit</li>
                        <li className='plan__list-item'>15% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Gold</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            52% <span className='plan__icon-span'>/monthly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $5000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $9,999
                        </li>
                        <li className='plan__list-item'>52% monthly profit</li>
                        <li className='plan__list-item'>15% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
                <div className='plan'>
                    <h2 className='plan__title'>Diamond</h2>
                    <div className='plan__icon'>
                        <p className='plan__icon-percent'>
                            64% <span className='plan__icon-span'>/monthly</span>
                        </p>
                    </div>

                    <ul className='plan__list'>
                        <li className='plan__list-item'>
                            Minimum Investment: $10000
                        </li>
                        <li className='plan__list-item'>
                            Maximum Investment: $49,999
                        </li>
                        <li className='plan__list-item'>64% monthly profit</li>
                        <li className='plan__list-item'>15% referral bonus</li>
                    </ul>

                    <Link className='plan__btn' to='Auth/signup'>
                        INVEST
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Plans
