import React, {Component} from 'react'

export default class TechnicalAnalysis extends Component {
    constructor(props) {
        super(props)
        this._ref = React.createRef()
    }
    componentDidMount() {
        const script = document.createElement('script')
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
        script.async = true
        script.innerHTML = JSON.stringify({
            interval: '1m',
            width: 425,
            isTransparent: false,
            height: 450,
            symbol: 'NASDAQ:AAPL',
            showIntervalTabs: true,
            locale: 'en',
            colorTheme: 'dark',
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
