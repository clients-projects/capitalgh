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

import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thDepositHistoryArray = ['No', 'Username', 'Amount', 'Plan', 'Date']

const AllUsersDepositHistory = (props) => {
    const [allUsersDeposit, setAllUsersDeposit] = useState([])

    const gottenAllUsersDeposit = useRef()
    useEffect(() => {
        if (!gottenAllUsersDeposit.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenAllUsersDeposit.current = true
        } else {
            if (props.allUsersDeposit) {
                setAllUsersDeposit(props.allUsersDeposit)
            }
        }
    }, [props])

    console.log({allUsersDeposit})
    console.log(thDepositHistoryArray)
    console.log(thWithdrawalArray)

    const products = [
        {
            id: 1,
            username: 'George',
            amount: '1000',
            plan: 'package 1',
            date: '1/11/2021',
        },
        {
            id: 2,
            username: 'Jeffrey',
            amount: '4844',
            plan: 'package 1',
            date: '1/11/2021',
        },
        {
            id: 3,
            username: 'Alice',
            amount: '2093',
            plan: 'package 1',
            date: '1/11/2021',
        },
        {
            id: 4,
            username: 'Alice',
            amount: '2093',
            plan: 'package 1',
            date: '1/11/2021',
        },
        {
            id: 5,
            username: 'Alice',
            amount: '2093',
            plan: 'package 1',
            date: '1/11/2021',
        }
    ]
    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'username', text: 'Username', sort: true },
        { dataField: 'amount', text: 'Invested Amount', sort: true },
        { dataField: 'plan', text: 'Plan', sort: true },
        { dataField: 'date', text: 'Date', sort: true },
   
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
                            title='Users Deposits'
                            category='Deposit History of all the users'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                    <ToolkitProvider
                                        bootstrap4
                                        data={products}
                                        keyField='id'
                                        columns={columns}
                                        search
                                        exportCSV
                                    >
                                        {(props) => (
                                            <div>
                                                <h6>
                                                    Input something at below
                                                    input field:
                                                </h6>
                                                <SearchBar
                                                    {...props.searchProps}
                                                />
                                                <ClearSearchButton
                                                    {...props.searchProps}
                                                />
                                                <hr />
                                                <MyExportCSV
                                                    {...props.csvProps}
                                                />
                                                <BootstrapTable
                                                    defaultSorted={
                                                        defaultSorted
                                                    }
                                                    classes='table-layout-auto'
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
    console.log({ state })
    return {
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        allUsersDeposit: state.fundAccount.allUsersDeposit,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUsersDepositHistory)
