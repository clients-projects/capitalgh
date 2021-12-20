import * as actions from './actionTypes'

//const URL = 'http://localhost:3030'

const URL = 'https://fxcry.herokuapp.com'

//const URL = 'http://robot44-env.eba-imcy7pye.us-east-1.elasticbeanstalk.com/api/graphql'

export const updateProfileStart = () => {
    return {
        type: actions.UPDATE_PROFILE_START,
    }
}
export const updateProfileSuccess = (data) => {
    return {
        type: actions.UPDATE_PROFILE_SUCCESS,
        data,
    }
}
export const updateMemberSuccess = (data) => {
    return {
        type: actions.UPDATE_MEMBER_SUCCESS,
        data,
    }
}
export const updateProfitSuccess = (data) => {
    return {
        type: actions.UPDATE_MEMBER_SUCCESS,
        data,
    }
}
export const updateProfileFailed = (err) => {
    return {
        type: actions.UPDATE_PROFILE_FAILED,
        err,
    }
}
export const getAdminSuccess = (data) => {
    return {
        type: actions.GET_ADMIN_SUCCESS,
        data,
    }
}
export const getUsersStart = () => {
    return {
        type: actions.UPDATE_PROFILE_START,
    }
}
export const getUsersSuccess = (data) => {
    return {
        type: actions.UPDATE_PROFILE_SUCCESS,
        data,
    }
}
export const getUsersFailed = (err) => {
    return {
        type: actions.UPDATE_PROFILE_FAILED,
        err,
    }
}
export const getUserHistoryStart = () => {
    return {
        type: actions.USER_HISTORY_START,
    }
}
export const getUserHistorySuccess = (data) => {
    return {
        type: actions.USER_HISTORY_SUCCESS,
        data,
    }
}
export const getUserHistoryFailed = (err) => {
    return {
        type: actions.USER_HISTORY_FAILED,
        err,
    }
}

export const investNowStart = () => {
    return {
        type: actions.INVEST_NOW_START,
    }
}
export const investNowSuccess = (data) => {
    return {
        type: actions.INVEST_NOW_SUCCESS,
        data,
    }
}
export const investNowApprovalSuccess = (data) => {
    return {
        type: actions.INVEST_NOW_APPROVAL_SUCCESS,
        data,
    }
}

export const investNowFailed = (err) => {
    return {
        type: actions.INVEST_NOW_FAILED,
        err,
    }
}
export const withdrawNowStart = () => {
    return {
        type: actions.WITHDRAW_NOW_START,
    }
}
export const withdrawNowSuccess = (data) => {
    return {
        type: actions.WITHDRAW_NOW_SUCCESS,
        data,
    }
}

export const withdrawNowApprovalSuccess = (data) => {
    return {
        type: actions.WITHDRAW_NOW_APPROVAL_SUCCESS,
        data,
    }
}

export const withdrawNowFailed = (err) => {
    return {
        type: actions.WITHDRAW_NOW_FAILED,
        err,
    }
}

export const initUpdateProfile = (updateProfileData, token) => {
    return (dispatch) => {
        dispatch(updateProfileStart())

        let graphqlQuery = {
            query: `
                mutation { createUpdateProfile(updateProfileData: {
                        username: "${updateProfileData.username}",
                        email: "${updateProfileData.email}",
                        oldEmail: "${updateProfileData.oldEmail}",
                        password: "${updateProfileData.confirmPassword}",
                        fullname: "${updateProfileData.fullname}",
                        city: "${updateProfileData.city}",
                        country: "${updateProfileData.country}",
                        phone: "${updateProfileData.phone}",
                        bitcoinAccount: "${updateProfileData.bitcoin}",
                        ethereumAccount: "${updateProfileData.ethereum}"
                    }){
                        
                        fullname
                        username
                        city
                        country
                        phone
                        bitcoinAccount
                        ethereumAccount
                        email
                        updatedAt
                        createdAt
                    }
                }
            `,
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
                    dispatch(updateProfileFailed(resData.errors[0].message))
                }

                dispatch(updateProfileSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(updateProfileFailed(err))
            })
    }
}
export const initUpdateMember = (updateMemberData, token) => {
    return (dispatch) => {
        dispatch(updateProfileStart())

        let graphqlQuery = {
            query: `
                mutation { createUpdateMember(updateMemberData: {
                        username: "${updateMemberData.username}",
                        email: "${updateMemberData.email}",
                        oldEmail: "${updateMemberData.oldEmail}",
                        activeReferrals: "${updateMemberData.activeReferrals}",
                        totalReferrals: "${updateMemberData.totalReferrals}",
                        dailyEarning: "${updateMemberData.dailyEarning}",
                        totalEarnings: "${updateMemberData.totalEarnings}",
                        totalReferralCommission: "${updateMemberData.totalReferralCommission}",
                        accountBalance: "${updateMemberData.accountBalance}",
                        password: "${updateMemberData.confirmPassword}",
                        fullname: "${updateMemberData.fullname}",
                        city: "${updateMemberData.city}",
                        country: "${updateMemberData.country}",
                        phone: "${updateMemberData.phone}",
                        bitcoinAccount: "${updateMemberData.bitcoin}",
                        ethereumAccount: "${updateMemberData.ethereum}"
                    }){
                        
                        fullname
                        username
                        city
                        country
                        activeReferrals
                        totalReferrals
                        totalReferralCommission
                        accountBalance
                        phone
                        bitcoinAccount
                        ethereumAccount
                        email
                        updatedAt
                        createdAt
                    }
                }
            `,
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
                    dispatch(updateProfileFailed(resData.errors[0].message))
                }

                dispatch(updateMemberSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(updateProfileFailed(err))
            })
    }
}

export const initUpdateProfit = (updateProfitData, memberId, token) => {
    return (dispatch) => {
        dispatch(updateProfileStart())

        let graphqlQuery = {
            query: `
                mutation  { createUpdateProfit(id: "${memberId}", updateProfitData:{ 
                    profit: "${updateProfitData}"
                }){
                        updatedAt
                        createdAt
                    }
                }
            `,
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
                    dispatch(updateProfileFailed(resData.errors[0].message))
                }

                dispatch(updateProfitSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(updateProfileFailed(err))
            })
    }
}
export const initGetUserHistory = (token) => {
    return (dispatch) => {
        dispatch(getUserHistoryStart())

        let graphqlQuery = {
            query: `{
                getUserHistory {
                    getDepositHistory {                    
                        historyNO
                        planName
                        amount
                        profit
                        updatedAt
                    }

                    getWithdrawalHistory {
                        historyNO
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
                    dispatch(getUserHistoryFailed(resData.errors[0].message))
                }

                dispatch(getUserHistorySuccess(resData.data.getUserHistory))
            })
            .catch((err) => {
                console.log(err)
                dispatch(getUserHistoryFailed(err))
            })
    }
}
export const initGetUsers = (token) => {
    return (dispatch) => {
        dispatch(getUsersStart())

        let graphqlQuery = {
            query: `{
                getUsers {
                    getUser {   
                        userNO
                        username
                        email
                        status
                        updatedAt
                    }

                    getUsersId {
                        _id
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
                    dispatch(getUsersFailed(resData.errors[0].message))
                }

                dispatch(getUsersSuccess(resData.data.getUsers))
            })
            .catch((err) => {
                console.log(err)
                dispatch(getUsersFailed(err))
            })
    }
}
export const initGetAdmin = (token) => {
    return (dispatch) => {
        dispatch(getUsersStart())

        let graphqlQuery = {
            query: `{
                getAdmin {
                    bitcoinAccount
                    ethereumAccount
                    username
                    updatedAt
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
                    dispatch(getUsersFailed(resData.errors[0].message))
                }

                dispatch(getAdminSuccess(resData.data.getAdmin))
            })
            .catch((err) => {
                console.log(err)
                dispatch(getUsersFailed(err))
            })
    }
}

export const initWithdrawNow = (withdrawNowData, token) => {
    return (dispatch) => {
        dispatch(withdrawNowStart())

        let graphqlQuery = {
            query: `
                mutation { createWithdrawNow(withdrawNowData: {
                        password: "${withdrawNowData.password}",
                        amount: "${withdrawNowData.amount}",
                        currency: "${withdrawNowData.currency}",
                    }){
                        _id
                        amount
                        currency
                        creator {
                            username
                        }
                        createdAt
                        updatedAt
                    }
                }
            `,
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
                    dispatch(withdrawNowFailed(resData.errors[0].message))
                }

                dispatch(withdrawNowSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(withdrawNowFailed(err))
            })
    }
}
export const initInvestNow = (investNowData, token) => {
    return (dispatch) => {
        dispatch(investNowStart())

        let graphqlQuery = {
            query: `
                mutation { createInvestNow(investNowData: {
                        selectedPlan: "${investNowData.packageName}",
                        amount: "${investNowData.amountToDeposit}",
                    }){
                        _id
                        amount
                        planName
                        creator {
                            username
                        }
                        createdAt
                        updatedAt
                    }
                }
            `,
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
                    dispatch(investNowFailed(resData.errors[0].message))
                }

                dispatch(investNowSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(investNowFailed(err))
            })
    }
}

export const initInvestNowApproval = (id, token) => {
    return (dispatch) => {
        dispatch(investNowStart())

        let graphqlQuery = {
            query: `
                mutation { createInvestNowApproval(PostId: {
                    id: "${id}"
                }){
                        _id
                        amount
                        currency
                        creator {
                            username
                        }
                        updatedAt
                    }
                },
            `,
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
                    dispatch(investNowFailed(resData.errors[0].message))
                }

                dispatch(
                    investNowApprovalSuccess(
                        resData.data.createInvestNowApproval
                    )
                )
            })
            .catch((err) => {
                console.log(err)
                dispatch(investNowFailed(err))
            })
    }
}
export const initWithdrawNowApproval = (id, token) => {
    return (dispatch) => {
        dispatch(withdrawNowStart())

        let graphqlQuery = {
            query: `
                mutation { createWithdrawNowApproval(PostId: {
                    id: "${id}"
                }){
                        _id
                        amount
                        currency
                        creator {
                            username
                        }
                        updatedAt
                    }
                },
            `,
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
                    dispatch(withdrawNowFailed(resData.errors[0].message))
                }

                dispatch(
                    withdrawNowApprovalSuccess(
                        resData.data.createwithdrawNowApproval
                    )
                )
            })
            .catch((err) => {
                console.log(err)
                dispatch(withdrawNowFailed(err))
            })
    }
}
