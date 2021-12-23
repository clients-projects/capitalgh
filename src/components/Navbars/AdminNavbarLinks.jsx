import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavItem, Nav } from 'react-bootstrap'

import * as orderAction from '../../store/actions/burgerIndex'

class AdminNavbarLinks extends Component {
    render() {
     

        let siteOwnerAdminLinks = (
            <>
             
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        <Link
                            to='/admin/deposit'
                            className='adminNav__fundAccount'
                        >
                            Deposit
                        </Link>
                    </NavItem>

                    <NavItem eventKey={7} onClick={this.props.onLogOut}>
                        Log out
                    </NavItem>
                </Nav>
            </>
        )

        if (this.props.siteOwner) {
            siteOwnerAdminLinks = (
                <>
                    <Nav>
                      

                        <NavItem eventKey={7} onClick={this.props.onLogOut}>
                            Log out
                        </NavItem>
                    </Nav>
                </>
            )
        }
        return <div className='adminNavLinks'>{siteOwnerAdminLinks}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        err: state.auth.error,
        loading: state.user.loading,
        redirectToLoginPage: state.auth.redirect,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        siteOwner: state.auth.siteOwner,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch(orderAction.logOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks)
