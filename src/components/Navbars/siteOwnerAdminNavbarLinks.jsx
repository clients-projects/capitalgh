import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

import * as orderAction from '../../store/actions/burgerIndex'

class AdminNavbarLinks extends Component {
    render() {
        // const notification = (
        //     <div>
        //         <i className='fa fa-globe' />
        //         <b className='caret' />
        //         <span className='notification'>0</span>
        //         <p className='hidden-lg hidden-md'>Notification</p>
        //     </div>
        // )
        return (
            <div className='adminNavLinks'>
                {/* <Nav>
                    <NavDropdown
                        eventKey={2}
                        title={notification}
                        noCaret
                        id='basic-nav-dropdown'
                    >
                        <MenuItem eventKey={2.1}>No notifications</MenuItem>
                    </NavDropdown>
                
                </Nav> */}
                <Nav pullRight>
                    <NavItem eventKey={7} onClick={this.props.onLogOut}>
                        Log out
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        redirectToLoginPage: state.auth.redirect,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch(orderAction.logOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks)
