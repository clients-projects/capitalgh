import * as actionTypes from '../actions/actionTypes'
import update from '../utility'

const initialState = {
    error: null,
    loading: false,
    userId: sessionStorage.getItem('userId') || null,
    tokenId: sessionStorage.getItem('token') || null,
    userData: {},
    userFundAccount: {},
    activities: {},
    latestDeposits: [],
    latestWithdrawals: [],
    userAccountBalance: 0,
    siteOwner: sessionStorage.getItem('siteOwner') || false,
    role: null,
    email: null,
}
const authStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}

const authSuccess = (state, action) => {
    return update(state, {
        ...action,
        loading: false,
        userId: action.userId,
        tokenId: action.tokenId,
        role: action.role,
        siteOwner:
            action.email === 'admin@fxcryptotokeninvestment.com' ? true : false,
        email: action.email,
        error: null,
    })
}

const authFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: {
            page: action.page,
            error: action.error,
        },
    })
}

const authRedirect = (state, action) => {
    return update(state, {
        loading: false,
        redirect: action.to,
    })
}

const clearError = (state, action) => {
    return update(state, {
        ...action,
        error: null,
    })
}

const getUser = (state, action) => {
    return update(state, {
        ...action,
        loading: false,
        userData: action.data.user,
        userFundAccount: action.data.userFundAccount,
        userPendingDeposit: action.data.userPendingDeposit,
        totalReceivedAmount: action.data.totalReceivedAmount,
        totalDisbursedAmount: action.data.totalDisbursedAmount,
        pendingDepositsCount: action.data.pendingDepositsCount,
        pendingWithdrawalsCount: action.data.pendingWithdrawalsCount,
        userDeposits: action.data.userDeposits,
        userWithdrawals: action.data.userWithdrawals,
        totalUserDeposits: action.data.totalUserDeposits,
        totalUserWithdrawals: action.data.totalUserWithdrawals,
        fundAccountCount: action.data.fundAccountCount,
        lastDepositAmount: action.data.lastDepositAmount,
        userPendingWithdrawalAmount: action.data.userPendingWithdrawalAmount,
    })
}
const getMember = (state, action) => {
    return update(state, {
        ...action,
        loading: false,
        member: action.data.user,
        memberDeposits: action.data.userDeposits,
        memberId: action.data.memberId,
        memberWithdrawals: action.data.userWithdrawals,
    })
}

const authLogOut = (state, action) => {
    return update(state, {
        ...action,
        loading: false,
        userId: null,
        tokenId: null,
        error: null,
    })
}

const getActivitiesSuccess = (state, action) => {
    return update(state, {
        ...action,
        loading: false,
        error: null,
        latestDeposits: action.data.theAllUsersDeposit,
        latestWithdrawals: action.data.theAllUsersWithdrawal,
        activities: action.data.updatedActivities,
    })
}
const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACTIVITIES:
            return getActivitiesSuccess(state, action)
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_GETUSER:
            return getUser(state, action)
        case actionTypes.AUTH_GETMEMBER:
            return getMember(state, action)
        case actionTypes.AUTH_REDIRECT:
            return authRedirect(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogOut(state, action)
        case actionTypes.AUTH_CLEAR_ERROR:
            return clearError(state, action)
        default:
            return state
    }
}

export default auth
