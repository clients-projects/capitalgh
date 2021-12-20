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


import './sass/main.scss'



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
