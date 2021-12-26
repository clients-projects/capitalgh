import * as actions from './actionTypes'

const URL = 'http://localhost:3030'

//const URL = 'https://capitalgh-back.herokuapp.com'


export const fundAccountStart = () => {
    return {
        type: actions.FUND_ACCOUNT_START,
    }
}
export const fundAccountSuccess = (data) => {
    return {
        type: actions.FUND_ACCOUNT_SUCCESS,
        data,
    }
}
export const getFundAccountSuccess = (data) => {
    return {
        type: actions.GET_FUND_ACCOUNT_SUCCESS,
        data,
    }
}
export const fundAccountFailed = (err) => {
    return {
        type: actions.FUND_ACCOUNT_FAILED,
        err,
    }
}
export const fundAccountApprovalSuccess = (data) => {
    return {
        type: actions.FUND_ACCOUNT_APPROVAL_SUCCESS,
        data,
    }
}

export const initFundAccount = (fundData, token) => {
    return (dispatch) => {
        dispatch(fundAccountStart())
    

        let graphqlQuery = {
            query: `
                mutation { createFundAccount(fundData: {
                        amount: "${fundData.amount}",
                        currency: "${fundData.currency}",
                    }){
                        _id
                        amount
                        currency
                        creator {
                            username
                        }
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
                    dispatch(fundAccountFailed(resData.errors[0].message))
                }

                dispatch(getFundAccountSuccess(resData.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(fundAccountFailed(err))
            })
    }
}
export const initGetFunds = (token) => {
    return (dispatch) => {
        dispatch(fundAccountStart())

        let graphqlQuery = {
            query: `{
                getFunds {
                    getPendingDeposit {
                        _id
                    }
                    getPendingWithdrawal {
                        _id
                    }

                    getFund {
                        _id
                    }

                    getAllUsersDeposit {
                        _id
                    }

                    getAllUsersWithdrawal {
                        _id
                    }

                    fundData {
                        fundNO
                        creator
                        amount
                        currency
                        status
                        updatedAt
                    }

                    thePendingDeposit {
                        fundNO
                        creator
                        amount
                        planName
                        status
                        updatedAt
                    }

                    thePendingWithdrawal {
                        fundNO
                        creator
                        amount
                        currency
                        status
                        updatedAt
                    }

                    theAllUsersDeposit {
                        fundNO
                        creator
                        amount
                        planName
                        updatedAt
                    }

                    theAllUsersWithdrawal{
                        fundNO
                        creator
                        amount
                        email
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
                console.log({resData})
                if (resData.errors) {
                    dispatch(fundAccountFailed(resData.errors[0].message))
                }

                dispatch(fundAccountSuccess(resData.data.getFunds))
            })
            .catch((err) => {
                console.log(err)
                dispatch(fundAccountFailed(err))
            })
    }
}
export const initFundApproval = (id, token) => {
    return (dispatch) => {
        dispatch(fundAccountStart())

        let graphqlQuery = {
            query: `
                mutation { createFundAccountApproval(PostId: {
                    id: "${id}"
                }){
                        _id
                        amount
                        currency
                        creator {
                            username
                        }
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
                    dispatch(fundAccountFailed(resData.errors[0].message))
                }

                dispatch(
                    fundAccountApprovalSuccess(
                        resData.data.createFundAccountApproval
                    )
                )
            })
            .catch((err) => {
                console.log(err)
                dispatch(fundAccountFailed(err))
            })
    }
}
