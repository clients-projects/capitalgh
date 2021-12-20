import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

const AdvancedRealChart = () => (
    <div className='advancedChart'>
    <TradingViewWidget
        symbol='NASDAQ:AAPL'
        theme={Themes.DARK}
        locale='en'
        autosize
    />
    </div>
)

export default AdvancedRealChart
