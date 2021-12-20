import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
            <footer className='footer' style={{ background: '#101d2c' }}>
                <Grid fluid>
                    <nav className='pull-left'>
                        <ul>
                            <li>
                                <a href='/'>Home</a>
                            </li>
                            <li>
                                <a href='/terms'>Terms and conditions</a>
                            </li>
                            <li>
                                <a href='/contact-us'>Contact Us</a>
                            </li>
                        </ul>
                    </nav>
                    <p className='copyright pull-right'>
                        &copy; {new Date().getFullYear()}{' '}
                        fxcryptotokeninvestment.com ALL RIGHTS RESERVED{' '}
                    </p>
                </Grid>
            </footer>
        )
    }
}

export default Footer
