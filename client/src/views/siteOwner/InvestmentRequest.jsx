import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import * as actions from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'


const PendingDeposits = (props) => {
    const [userPendingDeposit, setUserPendingDeposit] = useState([])
    const [loadedDeposits, setLoadedDeposits] = useState(false)

    const gottenUserPendingDeposit = useRef()
    useEffect(() => {
        if (!gottenUserPendingDeposit.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenUserPendingDeposit.current = true
        } else {
            if (props.pendingDeposit) {
                setUserPendingDeposit(props.pendingDeposit)
            }
        }
    }, [props, userPendingDeposit])

    useEffect(() => {
        if (userPendingDeposit.length > 0) {
            setLoadedDeposits(true)
        }
    }, [userPendingDeposit])


     const handleApproval = (id) => {
         const decrementId = id - 1
         console.log(userPendingDeposit[decrementId].status)
         if (userPendingDeposit[decrementId].status !== 'Approved') {
             console.log('status pending')
             for (let i = 0; i < props.idsOfPendingDeposits.length; i++) {
                 if (decrementId === i) {
                     console.log('send approval')
                     return props.onInitInvestNowApproval(
                         props.idsOfPendingDeposits[i]._id,
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

    if (userPendingDeposit.length > 0) {
        userPendingDeposit.map((value) => {
            console.log({value})
            const { fundNO, creator, amount, planName, updatedAt, status } =
                value
            console.log('the numbers to compare', props.buttonId, fundNO)
            withdrawalRequests.push({
                id: fundNO,
                username: creator,
                amount,
                plan: planName,
                status,
                date: updatedAt,
                action: (
                    <button
                        className={
                            loadedDeposits && status === 'Approved'
                                ? 'btn1 btn1__approved'
                                : 'btn1'
                        }
                        onClick={() => handleApproval(fundNO)}
                    >
                        {props.loading && props.buttonId === fundNO
                            ? 'Loading'
                            : loadedDeposits && status === 'Approved'
                            ? 'approved'
                            : 'approve'}
                    </button>
                ),
            })
        })
    }

    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'username', text: 'Username', sort: true },
        { dataField: 'amount', text: 'Amount Invested', sort: true },
        { dataField: 'plan', text: 'Plan', sort: true },
        { dataField: 'status', text: 'Status', sort: true },
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
                            title='Investment Requests'
                            category='Users that want to purchase a package'
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
        investNowApprovalSuccess: state.fundAccount.fundAccountApprovalSuccess,
        idsOfPendingDeposits: state.fundAccount.idsOfPendingDeposits,
        pendingDeposit: state.fundAccount.pendingDeposit,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
        onInitInvestNowApproval: (id, token, buttonId) =>
            dispatch(actions.initInvestNowApproval(id, token, buttonId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingDeposits)
