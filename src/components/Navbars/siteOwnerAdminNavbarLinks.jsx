import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavItem, Nav } from 'react-bootstrap'

import * as orderAction from '../../store/actions/burgerIndex'

class AdminNavbarLinks extends Component {
    render() {

        const handleLogout = () => {
            console.log('log out')
            return this.props.onLogOut
        }
      
        return (
            <div className='adminNavLinks'>
             
                <Nav pullRight>
                    <NavItem eventKey={7} onClick={handleLogout}>
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
