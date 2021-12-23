import React, { Component } from 'react'

export default class TechnicalAnalysis extends Component {
    constructor(props) {
        super(props)
        this._ref = React.createRef()
    }
    componentDidMount() {
        const script = document.createElement('script')
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
        script.async = true
        script.innerHTML = JSON.stringify({
            symbols: [
                {
                    proName: 'FOREXCOM:SPXUSD',
                    title: 'S&P 500',
                },
                {
                    proName: 'FOREXCOM:NSXUSD',
                    title: 'Nasdaq 100',
                },
                {
                    proName: 'FX_IDC:EURUSD',
                    title: 'EUR/USD',
                },
                {
                    proName: 'BITSTAMP:BTCUSD',
                    title: 'BTC/USD',
                },
                {
                    proName: 'BITSTAMP:ETHUSD',
                    title: 'ETH/USD',
                },
            ],
            colorTheme: 'dark',
            isTransparent: false,
            displayMode: 'compact',
            locale: 'en',
        })
        this._ref.current.appendChild(script)
    }
    render() {
        return (
            <div className='tradingview-widget-container' ref={this._ref}>
                <div className='tradingview-widget-container__widget'></div>
            </div>
        )
    }
}
