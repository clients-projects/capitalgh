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

const AllUsersWithdrawalHistory = (props) => {
    const [allUsersWithdrawal, setAllUsersWithdrawal] = useState([])

    const gottenAllUsersWithdrawal = useRef()
    useEffect(() => {
        if (!gottenAllUsersWithdrawal.current) {
            if (props.tokenId) {
                props.onInitGetFunds(props.tokenId)
            }
            gottenAllUsersWithdrawal.current = true
        } else {
            if (props.allUsersWithdrawal) {
                setAllUsersWithdrawal(props.allUsersWithdrawal)
            }
        }
    }, [props])

    const allWithdrawals = []

    if (allUsersWithdrawal.length > 0) {
        allUsersWithdrawal.map((value) => {
            const { fundNO, creator, amount, currency, updatedAt, email } =
                value

                console.log({email})
            allWithdrawals.push({
                id: fundNO,
                email: email ? email : creator,
                amount,
                currency,
                date: updatedAt,
            })
        })
    }

    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'email', text: 'email', sort: true },
        { dataField: 'amount', text: 'Amount Withdrawn', sort: true },
        { dataField: 'currency', text: 'Currency', sort: true },
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
                            title='Users Withdrawals'
                            category='Withdrawal History of all the users'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <ToolkitProvider
                                    bootstrap4
                                    data={allWithdrawals}
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
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        allUsersWithdrawal: state.fundAccount.allUsersWithdrawal,
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
)(AllUsersWithdrawalHistory)
