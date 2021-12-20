import * as actionTypes from '../actions/actionTypes'
import update from '../utility'

const initialState = {
    error: null,
    loading: false,
    usersData: {},
    getUsers: [],
    investNow: [],
    withdrawNow: [],
    getUserDepositHistory: [],
    getUserWithdrawalHistory: []
}

const getAdminSuccess = (state, action) => {
    return update(state, {
        loading: false,
        adminData: action.data
    })
}
const updateProfileStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const updateProfileSuccess = (state, action) => {
    return update(state, {
        loading: false,
        getUsers: action.data,
    })
}
const updateMemberSuccess = (state, action) => {
    return update(state, {
        loading: false,
        updatedMember: action.data,
    })
}
const updateProfitSuccess = (state, action) => {
    return update(state, {
        loading: false,
        updatedProfit: action.data,
    })
}
const updateProfileFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err,
    })
}
const getUserHistoryStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const getUserHistorySuccess = (state, action) => {
    return update(state, {
        loading: false,
        getUserDepositHistory: action.data.getDepositHistory,
        getUserWithdrawalHistory: action.data.getWithdrawalHistory,
    })
}
const getUserHistoryFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err,
    })
}
const investNowStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const investNowSuccess = (state, action) => {
    return update(state, {
        loading: false,
        investNow: action.data,
    })
}
const investNowApprovalSuccess = (state, action) => {
    return update(state, {
        loading: false,
        investNowApprovalSuccess: true,
    })
}
const investNowFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err,
    })
}
const withdrawNowStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const withdrawNowSuccess = (state, action) => {
    return update(state, {
        loading: false,
        withdrawNow: action.data,
    })
}

const withdrawNowApprovalSuccess = (state, action) => {
    return update(state, {
        loading: false,
        withdrawNowApprovalSuccess: true,
    })
}

const withdrawNowFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err,
    })
}
const getUsersFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err,
    })
}
const getUsersStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const getUsersSuccess = (state, action) => {
    return update(state, {
        loading: false,
        usersData: action.data.getUser,
        usersId: action.data.getUsersId
    })
}

const handleUsers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ADMIN_SUCCESS:
            return getAdminSuccess(state, action)
        case actionTypes.USER_HISTORY_START:
            return getUserHistoryStart(state, action)
        case actionTypes.USER_HISTORY_SUCCESS:
            return getUserHistorySuccess(state, action)
        case actionTypes.USER_HISTORY_FAILED:
            return getUserHistoryFailed(state, action)
        case actionTypes.UPDATE_PROFILE_START:
            return updateProfileStart(state, action)
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return updateProfileSuccess(state, action)
        case actionTypes.UPDATE_MEMBER_SUCCESS:
            return updateProfitSuccess(state, action)
        case actionTypes.UPDATE_PROFIT_SUCCESS:
            return updateMemberSuccess(state, action)
        case actionTypes.UPDATE_PROFILE_FAILED:
            return updateProfileFailed(state, action)
        case actionTypes.GET_USERS_START:
            return getUsersStart(state, action)
        case actionTypes.GET_USERS_SUCCESS:
            return getUsersSuccess(state, action)
        case actionTypes.GET_USERS_FAILED:
            return getUsersFailed(state, action)
        case actionTypes.WITHDRAW_NOW_START:
            return withdrawNowStart(state, action)
        case actionTypes.WITHDRAW_NOW_SUCCESS:
            return withdrawNowSuccess(state, action)
        case actionTypes.WITHDRAW_NOW_APPROVAL_SUCCESS:
            return withdrawNowApprovalSuccess(state, action)
        case actionTypes.WITHDRAW_NOW_FAILED:
            return withdrawNowFailed(state, action)
        case actionTypes.INVEST_NOW_START:
            return investNowStart(state, action)
        case actionTypes.INVEST_NOW_SUCCESS:
            return investNowSuccess(state, action)
        case actionTypes.INVEST_NOW_APPROVAL_SUCCESS:
            return investNowApprovalSuccess(state, action)
        case actionTypes.INVEST_NOW_FAILED:
            return investNowFailed(state, action)
        default:
            return state
    }
}

export default handleUsers
