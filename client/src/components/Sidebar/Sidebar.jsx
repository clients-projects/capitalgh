import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AdminNavbarLinks from '../Navbars/AdminNavbarLinks'

import logo from '../../images/logo2.png'
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1
            ? 'active'
            : ''
    }
    updateDimensions() {
        this.setState({ width: window.innerWidth })
    }
    componentDidMount() {
        this.updateDimensions()
        window.addEventListener('resize', this.updateDimensions.bind(this))
    }
    render() {
        const sidebarBackground = {
            backgroundImage: 'url(' + this.props.image + ')',
        }
        return (
            <div
                id='sidebar'
                className='sidebar'
                data-color={this.props.color}
                data-image={this.props.image}
            >
                {this.props.hasImage ? (
                    <div
                        className='sidebar-background'
                        style={sidebarBackground}
                    />
                ) : null}
                <div className='logo'>
                    <img src={logo} alt='logo_image' className='logo-2' />

                    {/* <a
                        href='/admin/dashboard'
                        className='simple-text logo-normal'
                    >
                        fxcryptotokeninvestment
                    </a> */}
                </div>
                <div className='sidebar-wrapper'>
                    <ul className='nav'>
                        {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
                        {this.props.dashboardRoutes.map((prop, key) => {
                            if (!prop.redirect)
                                return (
                                    <li
                                        className={this.activeRoute(
                                            prop.layout + prop.path
                                        )}
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className='nav-link'
                                            activeClassName='active'
                                        >
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                )
                            return null
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar
