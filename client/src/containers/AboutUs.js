import React from 'react'
import CryptoMarketWatch from '../tradeviewWidgets/CryptoMarketWatch'
import ReactParticles from '../components/ReactParticles'

function AboutUs() {
    return (
        <>
            <ReactParticles />

            <div className='about'>
                <h2 className='heading-2 about__header'>At A GLANCE</h2>
                <div className='about__content'>
                    <h3 className='heading-3 about__heading'>
                        Welcome to fxcryptotokeninvestment
                    </h3>
                    <p className='about__text'>
                        fxcryptotokeninvestment.com is one of the largest crypto
                        investment. We have been servicing our clients since
                        2010 and we are expanding our market share till this
                        day. Our exclusive location brings us an opportunity to
                        work with clients anywhere from the coast of the
                        Norwegian Sea to the shores of Western Europe.
                    </p>
                    <h3 className='heading-3 about__heading'>Our Vision</h3>
                    <p className='about__text'>
                        Our vision is to continuously seek for ways in which to
                        feature worth for our investors and make sure we tend to
                        never lose sight of our company values and core vision.
                        Our targeted senior management team is committed to
                        making sure that our high standards are maintained, our
                        regulation is strict and our complete support is given
                        passion and energy.
                    </p>
                    <h3 className='heading-3 about__heading'>Our Mission</h3>
                    <p className='about__text'>
                        Our mission is to deliver to clients wonderful services
                        through our hard working, innovatives services and full
                        commitments to clients’ satisfaction. We have a tendency
                        to apply modern fast technology and use a team of
                        extremely experienced professionals to bring clients’
                        monetary dreams in to real life. Our passion is to
                        continually work hard to assist clients get the most
                        effective potential value and cut price.
                    </p>
                </div>

                <div className='about__cryptoMarket'>
                    <CryptoMarketWatch />
                </div>
            </div>
        </>
    )
}

export default AboutUs
