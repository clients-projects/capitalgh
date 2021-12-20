import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/burgerIndex'

import AdminNavbar from '../components/Navbars/siteOwnerAdminNavbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import Deposit from '../views/Deposit'
import PlanConfirmation from '../views/PlanConfirmation'
import UserDetails from '../views/siteOwner/UserDetails'

//import FixedPlugin from "../components/FixedPlugin/FixedPlugin";

import { style } from '../variables/Variables'

import { siteOwnerDashboardRoutes } from '../routes.js'

//import image from "../assets/img/sidebar-3.jpg";
import sideBarImg from '../images/hero.jpg'
class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _notificationSystem: null,
            image: sideBarImg,
            color: 'black',
            hasImage: true,
            fixedClasses: 'dropdown show-dropdown open',
        }
    }

    handleNotificationClick = (position) => {
        var color = Math.floor(Math.random() * 4 + 1)
        var level
        switch (color) {
            case 1:
                level = 'success'
                break
            case 2:
                level = 'warning'
                break
            case 3:
                level = 'error'
                break
            case 4:
                level = 'info'
                break
            default:
                break
        }

        this.state._notificationSystem.addNotification({
            title: <span data-notify='icon' className='pe-7s-gift' />,
            message: (
                <div>
                    Welcome to <b>Coinperfect investment Dashboard</b> - The
                    most advanced trading platform
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        })
    }
    getsiteOwnerDashboardRoutes = (siteOwnerDashboardRoutes) => {
        return siteOwnerDashboardRoutes.map((prop, key) => {
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => (
                            <prop.component
                                {...props}
                                handleClick={this.handleNotificationClick}
                            />
                        )}
                        key={key}
                    />
                )
            } else {
                return null
            }
        })
    }
    getBrandText = (path) => {
        for (let i = 0; i < siteOwnerDashboardRoutes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    siteOwnerDashboardRoutes[i].layout +
                        siteOwnerDashboardRoutes[i].path
                ) !== -1
            ) {
                return siteOwnerDashboardRoutes[i].name
            }
        }
        const pathRoute = path.slice(7)
        return pathRoute ? pathRoute : 'fxcryptotokeninvestment'
    }
    handleImageClick = (image) => {
        this.setState({ image: image })
    }
    handleColorClick = (color) => {
        this.setState({ color: color })
    }
    handleHasImage = (hasImage) => {
        this.setState({ hasImage: hasImage })
    }
    handleFixedClick = () => {
        if (this.state.fixedClasses === 'dropdown') {
            this.setState({ fixedClasses: 'dropdown show-dropdown open' })
        } else {
            this.setState({ fixedClasses: 'dropdown' })
        }
    }
    componentDidMount() {
        this.setState({ _notificationSystem: this.refs.notificationSystem })
        var _notificationSystem = this.refs.notificationSystem
        var color = Math.floor(Math.random() * 4 + 1)
        var level
        switch (color) {
            case 1:
                level = 'success'
                break
            case 2:
                level = 'warning'
                break
            case 3:
                level = 'error'
                break
            case 4:
                level = 'info'
                break
            default:
                break
        }
        _notificationSystem.addNotification({
            title: <span data-notify='icon' className='pe-7s-gift' />,
            message: (
                <div>
                    Welcome to <b>fxcryptotokeninvestment Dashboard</b> - The
                    most advanced trading platform
                </div>
            ),
            level: level,
            position: 'tr',
            autoDismiss: 15,
        })

        if (this.props.tokenId) {
            this.props.onInitGetUser(this.props.tokenId)
        }
    }
    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf('nav-open') !== -1
        ) {
            document.documentElement.classList.toggle('nav-open')
        }
        if (e.history.action === 'PUSH') {
            document.documentElement.scrollTop = 0
            document.scrollingElement.scrollTop = 0
            this.refs.mainPanel.scrollTop = 0
        }
    }

    render() {
        return (
            <div className='wrapper' style={{ background: '#101d2c' }}>
                <NotificationSystem ref='notificationSystem' style={style} />
                <Sidebar
                    {...this.props}
                    dashboardRoutes={siteOwnerDashboardRoutes}
                    image={this.state.image}
                    color={this.state.color}
                    hasImage={this.state.hasImage}
                />
                <div
                    id='main-panel'
                    className='main-panel'
                    ref='mainPanel'
                    style={{ background: '#101d2c' }}
                >
                    <AdminNavbar
                        siteOwner={true}
                        {...this.props}
                        brandText={this.getBrandText(
                            this.props.location.pathname
                        )}
                    />
                    <Switch>
                        <Route
                            path='/admin/plan-confirmation/:id'
                            component={PlanConfirmation}
                        />
                        <Route path='/admin/deposit' component={Deposit} />
                        <Route path='/admin/member' component={UserDetails} />

                        {this.getsiteOwnerDashboardRoutes(
                            siteOwnerDashboardRoutes
                        )}
                    </Switch>
                    <Footer />
                    {/* <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            mini={this.state["mini"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        siteOwner: state.auth.siteOwner,
        redirectToLoginPage: state.auth.redirect,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUser: (token) => dispatch(actionTypes.initGetUser(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
