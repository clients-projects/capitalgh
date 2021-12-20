import React from 'react'

import Header from '../main/layout/home/Header'
import Plans from '../main/layout/home/Plans'
import Activities from '../main/layout/home/Activities'
import StoryContent from '../main/layout/home/StoryContent'
import StoryPictures from '../main/layout/home/StoryPictures'
import Transactions from '../main/layout/home/Transactions'
import WhyChooseUs from '../main/layout/home/WhyChooseUs'
import Testimonials from '../main/layout/home/Testimonials'

import LiveChart from '../tradeviewWidgets/LiveTicker'
import Chart from '../tradeviewWidgets/CryptoMarketWatch'
import ReactParticles from '../components/ReactParticles'

import Back from '../images/back.jpg'
import Hero from '../images/hero.jpg'
import WhyUs from '../images/whyChooseUs.jpg'

const storyStyle = {
    backgroundImage: `linear-gradient(rgba(198, 153, 99, .7), rgba(198, 153, 99, .7)), url(${Back})`,
    width: '100%',
}
const headerStyle = {
    backgroundImage: `linear-gradient(rgba(16, 29, 44, .6), rgba(16, 29, 44, .6)), url(${Hero})`,
}
const whyChooseUsStyle = {
    backgroundImage: `linear-gradient(rgba(16, 29, 44, .8), rgba(16, 29, 44, .7)), url(${WhyUs})`,
    backgroundPosition: 'cover',
}

function Layout(props) {
   
    return (
        <>
          <ReactParticles/>
            <div className='section-liveChart'>
                <LiveChart />
            </div>
            <div className='section-header' style={headerStyle}>
                <Header />
            </div>

            <div className='section-plans'>
                <Plans />
            </div>
            <div className='section-story__pictures' style={storyStyle}>
                <StoryPictures />
            </div>
            <div className='section-story__content'>
                <StoryContent />
            </div>
            <div className='section-tradeviewChart'>
                <Chart />
            </div>

            <div className='section-activities'>
                <Activities />
            </div>
            <div className='section-whyChooseUs' style={whyChooseUsStyle}>
                <WhyChooseUs />
            </div>
            <div className='section-transactions'>
                <Transactions />
            </div>
            <div className='section-testimonials'>
                <Testimonials />
            </div>
        </>
    )
}

export default Layout
