import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import * as orderAction from '../store/actions/burgerIndex'

import Card from '../components/Card/Card'


const Members = (props) => {
    const [getWithdrawalHistory, setWithdrawalHistory] = useState([])

    const gottenWithdrawalHistory = useRef()
    useEffect(() => {
        if (!gottenWithdrawalHistory.current) {
            if (props.tokenId) {
                props.onInitGetUserHistory(props.tokenId)
            }
            gottenWithdrawalHistory.current = true
        } else {
            if (props.getUserWithdrawalHistory) {
                setWithdrawalHistory(props.getUserWithdrawalHistory)
            }
        }
    }, [props])

    const withdrawalHistory = []

    if (getWithdrawalHistory.length > 0) {
        getWithdrawalHistory.map((value) => {
            const { fundNO, creator, amount, planName, updatedAt } = value
            console.log({ value })

            const creatorEmail = creator.email

            return withdrawalHistory.push({
                id: fundNO,
                email: creatorEmail,
                amount,
                plan: planName,
                date: updatedAt,
            })
        })
    }

    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'amount', text: 'amount', sort: true },
        { dataField: 'currency', text: 'currency', sort: true },
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
                            title='Your Investment'
                            category='History'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <ToolkitProvider
                                    bootstrap4
                                    data={withdrawalHistory}
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
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        getUserWithdrawalHistory: state.user.getUserWithdrawalHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUserHistory: (token) =>
            dispatch(orderAction.initGetUserHistory(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Members)
