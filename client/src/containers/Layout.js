import React from 'react'
import { useLastLocation } from 'react-router-last-location'
import {useHistory} from 'react-router-dom'

import SubHeader from '../main/layout/SubHeader'
import Footer from '../main/layout/Footer'

function Layout(props) {
    const lastLocation = useLastLocation()
    const history = useHistory()

    let fromlocationPath = ''
    for (let i in lastLocation) {
        if (i === 'pathname') {
            fromlocationPath = lastLocation[i]
        }
    }
    const fromLocationSplit = fromlocationPath.split(' ')


    //Check how this can be added to redux and called from there
    let toRender

    const adminPath = props.isAdmin.pathname
    let isAdmin = adminPath.includes('/admin')

    if (isAdmin) {

        if(adminPath === '/admin' || adminPath === '/admin/'){
            history.push('/admin/dashboard')
        }

        localStorage.setItem('cssLoaded', false)
        import('bootstrap/dist/css/bootstrap.min.css').then((Baz) => {
        })
        import('../assets/css/animate.min.css').then((Baz) => {
        })
        import(
            '../assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0'
        ).then((Baz) => {
        })
        import('../assets/css/demo.css').then((Baz) => {
        })
        const all = import('../assets/css/pe-icon-7-stroke.css').then((Baz) => {
        })
        all.finally((result) => {
            localStorage.setItem('cssLoaded', true)
        })

        toRender = props.children
    } else {
        if (fromLocationSplit[0].includes('admin')) {
            window.location.reload()
        } 
        toRender = (
            <>
                <div className='section-subHeader'>
                    <SubHeader />
                </div>
                <main className='main'>{props.children}</main>
                <div className='section-footer'>
                    <Footer />
                </div>{' '}
            </>
        )
    }

    return <>{toRender}</>
}

export default Layout
