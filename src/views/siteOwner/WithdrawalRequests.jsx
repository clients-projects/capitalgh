import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'

const PendingWithdrawals = (props) => {
    const [userPendingWithdrawal, setUserPendingWithdrawal] = useState([])
    const [loadedWithdrawals, setLoadedWithdrawals] = useState(false)

    const gottenUserPendingWithdrawal = useRef()
    useEffect(() => {
        if (!gottenUserPendingWithdrawal.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenUserPendingWithdrawal.current = true
        } else {
            if (props.pendingWithdrawal) {
                setUserPendingWithdrawal(props.pendingWithdrawal)
            }
        }
    }, [props])

    useEffect(() => {
        if (userPendingWithdrawal.length > 0) {
            setLoadedWithdrawals(true)
        }
    }, [userPendingWithdrawal])

    const handleApproval = (id) => {
        const decrementId = id - 1
        console.log(userPendingWithdrawal[decrementId].status)
        if (userPendingWithdrawal[decrementId].status !== 'Approved') {
            console.log('status pending')
            for (let i = 0; i < props.idsOfPendingWithdrawals.length; i++) {
                if (decrementId === i) {
                    console.log('send approval')
                    return props.onInitWithdrawNowApproval(
                        props.idsOfPendingWithdrawals[i]._id,
                        props.tokenId,
                        id
                    )
                }
            }
        } else {
            console.log('Already approved')
        }
    }

    const withdrawalRequests = []

    if (userPendingWithdrawal.length > 0) {
        userPendingWithdrawal.map((value) => {
            const { fundNO, creator, amount, currency, updatedAt, status, email } =
                value
            
                const creatorEmail = creator.email
                const creatorBitcoinAccount = creator.bitcoinAccount
                const creatorEthereumAccount = creator.ethereumAccount

                console.log({creatorBitcoinAccount})

                
                let cryptoAddressToDisplay = creatorBitcoinAccount || creatorEthereumAccount

                if(!cryptoAddressToDisplay){
                    console.log('empty string', cryptoAddressToDisplay)
                    cryptoAddressToDisplay = 'No address Provided'
                }else {
                    console.log('not empty', cryptoAddressToDisplay)
                }

                console.log("address final", creatorEmail, cryptoAddressToDisplay)

            withdrawalRequests.push({
                id: fundNO,
                email: email !== 'undefined' ? email : creatorEmail,
                amount,
                currency,
                cryptoAddress : cryptoAddressToDisplay ,
                status,
                date: updatedAt,
                action: (
                    <>
                        <button
                            className={
                                loadedWithdrawals && status === 'Approved'
                                    ? 'btn1 btn1__approved'
                                    : 'btn1'
                            }
                            onClick={() => handleApproval(fundNO)}
                        >
                            {props.loading && props.buttonId === fundNO
                                ? 'Loading'
                                : loadedWithdrawals && status === 'Approved'
                                ? 'approved'
                                : 'approve'}
                        </button>
                    </>
                ),
            })
        })
    }

    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'email', text: 'email', sort: true },
        { dataField: 'amount', text: 'Amount Withdrawn', sort: true },
        { dataField: 'currency', text: 'Currency', sort: true },
        { dataField: 'status', text: 'Status', sort: true },
        { dataField: 'cryptoAddress', text: 'crypto Address', sort: true },
        { dataField: 'date', text: 'Date', sort: true },
        { dataField: 'action', text: 'Action', sort: true },
    ]

    const defaultSorted = [
        {
            dataField: 'name',
            order: 'desc',
        },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page)
            console.log('sizePerPage', sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page)
            console.log('sizePerPage', sizePerPage)
        },
    })

    const { SearchBar, ClearSearchButton } = Search

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport()
        }
        return (
            <div>
                <button className='btn btn-success' onClick={handleClick}>
                    Export to CSV
                </button>
            </div>
        )
    }
    return (
        <div className='content'>
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            plain
                            title='Withdrawal Requests'
                            category='Users that want to purchase a plan'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                              

                                <ToolkitProvider
                                    bootstrap4
                                    data={withdrawalRequests}
                                    keyField='id'
                                    columns={columns}
                                    search
                                    exportCSV
                                >
                                    {(props) => (
                                        <div>
                                            <SearchBar {...props.searchProps} />{' '}
                                            <ClearSearchButton
                                                {...props.searchProps}
                                            />
                                            <hr />
                                            <MyExportCSV {...props.csvProps} />
                                            <BootstrapTable
                                                defaultSorted={defaultSorted}
                                                classes='table-layout-auto custom-table'
                                                pagination={pagination}
                                                {...props.baseProps}
                                            />
                                        </div>
                                    )}
                                </ToolkitProvider>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        fundLoading: state.fundAccount.loading,
        buttonId: state.user.buttonId,
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        withdrawNowApprovalSuccess:
            state.fundAccount.fundAccountApprovalSuccess,
        idsOfPendingWithdrawals: state.fundAccount.idsOfPendingWithdrawals,
        pendingWithdrawal: state.fundAccount.pendingWithdrawal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
        onInitWithdrawNowApproval: (id, token, buttonId) =>
            dispatch(actions.initWithdrawNowApproval(id, token, buttonId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingWithdrawals)
