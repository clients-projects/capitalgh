import * as actionTypes from '../actions/actionTypes'
import update from '../utility'

const initialState = {
    error: null,
    loading: false,
    fundedAccount: [],
    idsOfFunds: [],
    getAllFundsAccount: [],
    pendingDeposit: [],
    idsOfPendingDeposits: [],
    pendingWithdrawal: [],
    idsOfPendingWithdrawals: [],
    idsOfAllUsersDeposit: [],
    idsOfAllUsersWithdrawal: [],
    allUsersDeposit: [],
    allUsersWithdrawal: [],
    fundAccountApprovalSuccess: false,
}
const fundAccountStart = (state, action) => {
    return update(state, {
        loading: true,
    })
}
const fundAccountSuccess = (state, action) => {
    return update(state, {
        loading: false,
        fundedAccount: action.data.fundData,
        idsOfFunds: action.data.getFund,
        idsOfPendingDeposits: action.data.getPendingDeposit,
        idsOfPendingWithdrawals: action.data.getPendingWithdrawal,
        idsOfAllUsersDeposit: action.data.getAllUsersDeposit,
        idsOfAllUsersWithdrawal: action.data.getAllUsersWithdrawal,
        pendingDeposit: action.data.thePendingDeposit,
        pendingWithdrawal: action.data.thePendingWithdrawal,
        allUsersDeposit: action.data.theAllUsersDeposit,
        allUsersWithdrawal: action.data.theAllUsersWithdrawal
    })
}

const getFundAccountSuccess = (state, action) => {
    
    return update(state, {
        loading: false,
        getAllFundsAccount: action.data
    })
}
const fundAccountFailed = (state, action) => {
    return update(state, {
        loading: false,
        error: action.err
    })
}


const fundAccountApprovalSuccess = (state, action) => {
    return update(state, {
        loading: false,
        fundAccountApprovalSuccess: true
    })
}

const fundAccount = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FUND_ACCOUNT_START:
            return fundAccountStart(state, action)
        case actionTypes.FUND_ACCOUNT_SUCCESS:
            return fundAccountSuccess(state, action)
        case actionTypes.GET_FUND_ACCOUNT_SUCCESS:
            return getFundAccountSuccess(state, action)
        case actionTypes.FUND_ACCOUNT_FAILED:
            return fundAccountFailed(state, action)
        case actionTypes.FUND_ACCOUNT_APPROVAL_SUCCESS:
            return fundAccountApprovalSuccess(state, action)

        default:
            return state
    }
}

export default fundAccount
