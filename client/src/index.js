import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { LastLocationProvider } from 'react-router-last-location'

import App from './containers/App'
import fundAccount from './store/reducers/fundAccount'
import userReducer from './store/reducers/users'
import authReducer from './store/reducers/auth'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import './assets/css/animate.min.css'
// import './assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0'
// import './assets/css/demo.css'
// import './assets/css/pe-icon-7-stroke.css'

import './sass/main.scss'

// const Bootstrap = React.lazy(() =>
//     import('bootstrap/dist/css/bootstrap.min.css')
// )
// const Animate = React.lazy(() => import('./assets/css/animate.min.css'))
// const LightBootstrap = React.lazy(() =>
//     import('./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0')
// )
// const DemoCss = React.lazy(() => import('./assets/css/demo.css'))
// const Stroke = React.lazy(() => import('./assets/css/pe-icon-7-stroke.css'))

//STEP 2:
//create a parent component that will load the components conditionally using React.Suspense
// const ThemeSelector = ({ children }) => {
//     //   const CHOSEN_THEME = localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.DEFAULT;
//     return (
//         <>
//             <React.Suspense fallback={<>App</>}>
//                 {/* {(CHOSEN_THEME === TYPE_OF_THEME.LIGHT_MODE) && <LightTheme />}
//         {(CHOSEN_THEME === TYPE_OF_THEME.DARK_MODE) && <DarkTheme />} */}
//                 {<Bootstrap />}
//                 {<Animate />}
//                 {<LightBootstrap />}
//                 {<DemoCss />}
//                 {<Stroke />}
//             {children}
//             </React.Suspense>
//         </>
//     )
// }

const rootReducer = {
    user: userReducer,
    fundAccount: fundAccount,
    auth: authReducer,
}

const store = createStore(
    combineReducers(rootReducer),
    composeWithDevTools(applyMiddleware(thunk))
)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <LastLocationProvider>
                <App />
            </LastLocationProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
