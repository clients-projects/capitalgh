import React from 'react'
import CryptoMarketWatch from '../tradeviewWidgets/CryptoMarketWatch'
import ReactParticles from '../components/ReactParticles'
import vd1 from '../videos/vd1.mp4'
import vd2 from '../videos/vd2.mp4'
import { Link } from 'react-router-dom'

function HowToBuyBitcoin() {
    return (
        <>
            <ReactParticles />

            <div className='about'>
                <h2 className='heading-2 about__header'>HOW TO BUY BITCOIN</h2>
                <div>
                    <h3 className='heading-3 about__heading'>
                        Why these videos
                    </h3>
                    <p className='about__text'>
                        As it is part of our mission to deliver to clients
                        wonderful services through our hard working, innovating
                        services and full commitments to clients’ satisfaction,
                        we came up with these specific video guilds that will
                        help you to buy bitcoins without any prior knowledge of
                        the crypto world, Please try watching to the end of each
                        video for a clear understanding, if you have any
                        questions or suggestions please do well to contact us
                    </p>
                    <video width='320' height='240' controls>
                        <source src={vd1} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>{' '}
                    <p className='about__text' style={{ marginBottom: '0' }}>
                        <span>First Video:</span> How to use Bitcoin ATM: step
                        by step
                    </p>
                    
                    <video width='320' height='240' controls style={{marginTop: '2rem'}}>
                        <source src={vd2} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>{' '}
                    <p className='about__text' style={{ marginBottom: '0' }}>
                        <span>Second Video:</span> How to buy Bitcoin on Cash
                        App instantly
                    </p>
                </div>

                <div className='about__cryptoMarket'>
                    <CryptoMarketWatch />
                </div>
            </div>
        </>
    )
}

export default HowToBuyBitcoin
