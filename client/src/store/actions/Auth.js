import * as actions from './actionTypes'

//const URL = 'http://localhost:3030/api/graphql'

const URL = 'https://fxcry.herokuapp.com/api/graphql'

//const URL = 'http://robot44-env.eba-imcy7pye.us-east-1.elasticbeanstalk.com/api/graphql'

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    }
}

export const authSuccessCheck = (auth, token, role, email) => {
    return (dispatch) => {
        sessionStorage.setItem('userId', auth)
        sessionStorage.setItem('token', token)

        if (email === 'admin@fxcryptotokeninvestment.com') {
            sessionStorage.setItem('siteOwner', true)
        }

        const remainingMilliseconds = 3600 * 1000
        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        )

        //After set this to calculate the expiration based on the sessionStorage
        sessionStorage.setItem('expiryTime', remainingMilliseconds)
        sessionStorage.setItem('expiryDate', expiryDate.toISOString())
        dispatch(authSuccess(auth, token, role, email))

        setTimeout(() => {}, remainingMilliseconds)
    }
}

export const getActivitiesSuccess = (data) => {
    return {
        type: actions.GET_ACTIVITIES,
        data,
    }
}
export const authSuccess = (auth, token, role, email) => {
    return {
        type: actions.AUTH_SUCCESS,
        userId: auth,
        tokenId: token,
        role,
        email,
    }
}

export const authFailed = (page, error) => {
    return {
        type: actions.AUTH_FAILED,
        page,
        error,
    }
}

export const redirect = (to, data) => {
    return {
        type: actions.AUTH_REDIRECT,
        to,
        data,
    }
}

export const logOut = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('expiryDate')
    sessionStorage.removeItem('siteOwner')

    return {
        type: actions.AUTH_LOGOUT,
    }
}

export const clearError = () => {
    return {
        type: actions.AUTH_CLEAR_ERROR,
    }
}

export const getUser = (data) => {
    return {
        type: actions.AUTH_GETUSER,
        data,
    }
}
export const getMember = (data) => {
    return {
        type: actions.AUTH_GETMEMBER,
        data,
    }
}

export const initGetUser = (token) => {
    return (dispatch) => {
        dispatch(authStart())
        const graphqlQuery = {
            query: `{
                
                getUser {

                    user {
                        username
                        email
                        fullname
                        ethereumAccount
                        bitcoinAccount
                        accountBalance
                        role
                        phone
                        upline
                        dailyEarning
                        totalEarnings
                        referralLink
                        activeReferrals
                        totalReferralCommission
                        totalReferrals
                        accountBalance
                        country
                        city
                        status
                        createdAt
                        updatedAt
                        
                        referrals {
                            username
                        }
                     }
        
                    userPendingDeposit {
                        _id
                        amount
                        status
                        planName
                        currency
                        createdAt
                        updatedAt
                    }

                      userFundAccount {    
                        _id 
                        amount
                        status
                        currency
                        createdAt
                        updatedAt
                    }

                    userDeposits {
                        _id
                        amount
                        profit
                        createdAt
                        updatedAt
                    }
                    userWithdrawals {
                        _id
                        amount
                        createdAt
                        updatedAt
                    }

                    totalDisbursedAmount
                    totalReceivedAmount
                    pendingWithdrawalsCount
                    pendingDepositsCount
                    totalUserDeposits
                    totalUserWithdrawals
                    fundAccountCount
                    lastDepositAmount
                    userPendingWithdrawalAmount
            }
            }`,
        }
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(graphqlQuery),
        })
            .then((res) => {
                return res.json()
            })
            .then((resData) => {
                if (resData.errors) {
                    dispatch(authFailed('getUser', resData.errors[0].message))
                }
                dispatch(getUser(resData.data.getUser))
            })
            .catch((err) => {
                console.log('error in getUser', err)
                return dispatch(authFailed('getUser', 'Failed to fetch (500)'))
            })
    }
}
export const initGetMember = (id, token) => {
    return (dispatch) => {
        dispatch(authStart())
        const graphqlQuery = {
            query: `{
                
                getMember(id: "${id}") {

                    user {
                        username
                        email
                        fullname
                        ethereumAccount
                        bitcoinAccount
                        accountBalance
                        role
                        phone
                        upline
                        dailyEarning
                        totalEarnings
                        referralLink
                        activeReferrals
                        totalReferralCommission
                        totalReferrals
                        country
                        city
                        status
                        createdAt
                        updatedAt
                        
                        referrals {
                            username
                        }
                     }
        
               


                    userDeposits {
                        fundNO
                        amount
                        planName
                        profit
                        updatedAt
                    }
                    userWithdrawals {
                        _id
                        amount
                        updatedAt
                    }

                    memberId{
                        _id
                    }

            }
            }`,
        }
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(graphqlQuery),
        })
            .then((res) => {
                return res.json()
            })
            .then((resData) => {
                if (resData.errors) {
                    console.log('resData error of getMember', resData.errors)
                    dispatch(authFailed('getUser', resData.errors[0].message))
                }
                dispatch(getMember(resData.data.getMember))
            })
            .catch((err) => {
                console.log('error in getUser', err)
                return dispatch(authFailed('getUser', 'Failed to fetch (500)'))
            })
    }
}

export const initLogin = (email, password) => {
    return (dispatch) => {
        dispatch(authStart())

        const graphqlQuery = {
            query: `{
                login(email: "${email}", password: "${password}"){
                userId
                token
                role
                email
            }
          }
         `,
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphqlQuery),
        })
            .then((res) => {
                return res.json()
            })
            .then((resData) => {
                if (resData.errors) {
                    return dispatch(
                        authFailed('login', resData.errors[0].message)
                    )
                    // throw new Error('Login failed!')
                }

                dispatch(
                    authSuccessCheck(
                        resData.data.login.userId,
                        resData.data.login.token,
                        resData.data.login.role,
                        resData.data.login.email
                    )
                )
            })
            .catch((err) => {
                console.log('error in login', err)
                return dispatch(authFailed('login', 'Failed to fetch (500)'))
            })
    }
}

export const initSignup = (authData) => {
    return (dispatch) => {
        dispatch(authStart())

        const data = authData.signupForm

        const graphqlQuery = {
            query: ` mutation { createUser(userData: {
            username: "${data.username.value}",
            email: "${data.confirmEmail.value}",
            password: "${data.confirmPassword.value}",
            referral: "${data.referral.value}",
            fullname: "${data.fullname.value}",
            bitcoinAccount: "${data.bitcoinAccount.value}",
            ethereumAccount: "${data.ethereumAccount.value}"
           }) {  email username fullname }
         }`,
        }

        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(graphqlQuery),
        })
            .then((res) => {
                return res.json()
            })
            .then((resData) => {
                if (resData.errors) {
                    return dispatch(
                        authFailed('signup', resData.errors[0].message)
                    )
                    // throw new Error('Creating a user failed!')
                }

                dispatch(redirect('/Auth/login', resData.data.createUser))
            })
            .catch((err) => {
                console.log('error in signup', err)
                return dispatch(authFailed('signup', 'Failed to fetch (500)'))
            })
    }
}

export const initActivities = (token) => {
    return (dispatch) => {
        dispatch(authStart())

        let graphqlQuery = {
            query: `{
                getActivities {
                    updatedActivities {
                        onlineDays
                        totalMembers
                        totalPaidOut
                        totalInvestments
                        siteTotalPaidOut
                        siteTotalInvestments
                        newestMember
                        lastDepositName
                        lastDepositAmount
                        lastWithdrawalName
                        lastWithdrawalAmount
                    }
               
                    theAllUsersDeposit {
                        creator
                        amount
                        currency
                        updatedAt
                    }
                    theAllUsersWithdrawal {
                        creator
                        amount
                        currency
                        updatedAt
                    }
                }
            }`,
        }

        return fetch(URL + '/api/graphql', {
            method: 'POST',
            body: JSON.stringify(graphqlQuery),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((resData) => {
                if (resData.errors) {
                    dispatch(authFailed(resData.errors[0].message))
                }

                dispatch(getActivitiesSuccess(resData.data.getActivities))
            })
            .catch((err) => {
                console.log(err)
                dispatch(authFailed(err))
            })
    }
}
