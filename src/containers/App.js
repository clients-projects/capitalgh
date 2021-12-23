import React, { useEffect, useRef } from 'react'
import {
    Switch,
    Route,
    Redirect,
    useLocation,
    withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../store/actions/burgerIndex'
import Layout from './Layout'
import AdminLayout from './Admin'
import SiteOwnerAdmin from './siteOwnerAdmin'

import LoginPage from './auth/Login'
import SignupPage from './auth/Signup'

function App(props) {
    const location = useLocation()

    const ref = useRef()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (!ref.current) {
            if (token) {
                props.onCheckState(token, userId)
            } else {
                props.onInitActivities()
            }
        }
        ref.current = true
    }, [props])

   

  
    let AuthGuard = (
        <Switch>
            <Route
                path='/'
                exact
                render={(props) => <LoginPage {...props} />}
            />
            <Route
                path='/Auth/signup'
                render={(props) => <SignupPage {...props} />}
            />

            <Redirect to='/' />
        </Switch>
    )
    if (props.auth) {
        let admintoShow = (
            <Route
                path='/admin'
                render={(props) => <AdminLayout {...props} />}
            />
        )

        if (props.siteOwner) {
            admintoShow = (
                <Route
                    path='/admin'
                    render={(props) => <SiteOwnerAdmin {...props} />}
                />
            )
        }

        AuthGuard = (
            <Switch>
                <Route
                    path='/'
                    exact
                    render={(props) => <LoginPage {...props} />}
                />
            

                {admintoShow}
                <Redirect to='/' />
            </Switch>
        )
    }

    return (
       <div style={{height: '100%'}}>
            <Layout isAdmin={location} siteOwner={props.siteOwner}>
                {AuthGuard}
            </Layout>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        siteOwner: state.auth.siteOwner,
        auth: state.auth.tokenId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckState: (tokenId, userId) =>
            dispatch(actions.authSuccess(tokenId, userId)),
        onInitActivities: () => dispatch(actions.initActivities()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
