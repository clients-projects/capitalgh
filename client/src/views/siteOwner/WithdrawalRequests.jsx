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
//import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

const thWithdrawalArray = [
    'No',
    'Username',
    'Amount',
    'Currency',
    'Status',
    'Date',
]

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
        console.log({id})
        for (let i = 0; i < props.idsOfPendingWithdrawals.length; i++) {
            if (id === i && (userPendingWithdrawal[i - 1].status !== 'Approved')) {
                console.log(props.idsOfPendingWithdrawals)
                console.log({userPendingWithdrawal})

               console.log(userPendingWithdrawal[i - 1])
               // return props.onInitWithdrawNowApproval(
                //     props.idsOfPendingWithdrawals[i]._id,
                //     props.tokenId
                // )
            }

            else{
                console.log('Already approved')
            }
        }
    }

     const withdrawalRequests = []

     if (userPendingWithdrawal.length > 0) {
         userPendingWithdrawal.map((value) => {
             const { fundNO, creator, amount, currency, updatedAt, status } = value
             withdrawalRequests.push({
                 id: fundNO,
                 username: creator,
                 amount,
                 currency,
                 status,
                 date: updatedAt,
                 action: (
                     <button
                         className={
                             loadedWithdrawals && status === 'Approved'
                                 ? 'btn1 btn1__approved'
                                 : 'btn1'
                         }
                         onClick={() => handleApproval(fundNO)}
                     >
                         {props.loading
                             ? 'Loading...'
                             : loadedWithdrawals && status === 'Approved'
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
         { dataField: 'amount', text: 'Amount Withdrawn', sort: true },
         { dataField: 'currency', text: 'Currency', sort: true },
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
                            title='Withdrawal Requests'
                            category='Users that want to purchase a plan'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                // <Table>
                                //     <thead>
                                //         <tr>
                                //             {thWithdrawalArray.map(
                                //                 (prop, key) => {
                                //                     return (
                                //                         <th key={key}>
                                //                             {prop}
                                //                         </th>
                                //                     )
                                //                 }
                                //             )}
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         {userPendingWithdrawal.map((prop, key) => {
                                //             return (
                                //                 <tr key={key}>
                                //                     {Object.values(prop).map(
                                //                         (prop) => {
                                //                             return (
                                //                                 <td key={key}>
                                //                                     {prop}
                                //                                 </td>
                                //                             )
                                //                         }
                                //                     )}
                                //                     <button
                                //                         className={
                                //                             loadedWithdrawals &&
                                //                             prop.status ===
                                //                                 'Approved'
                                //                                 ? 'btn1 btn1__approved'
                                //                                 : 'btn1'
                                //                         }
                                //                         onClick={() =>
                                //                             handleApproval(key)
                                //                         }
                                //                     >
                                //                         {props.loading
                                //                             ? 'Loading...'
                                //                             : loadedWithdrawals &&
                                //                               prop.status ===
                                //                                   'Approved'
                                //                             ? 'approved'
                                //                             : 'approve'}
                                //                     </button>
                                //                 </tr>
                                //             )
                                //         })}
                                //     </tbody>
                                // </Table>
                            
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
                                              
                                                <SearchBar
                                                    {...props.searchProps}
                                                /> {' '}
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
                                    </ToolkitProvider>}
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
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
        withdrawNowApprovalSuccess: state.fundAccount.fundAccountApprovalSuccess,
        idsOfPendingWithdrawals: state.fundAccount.idsOfPendingWithdrawals,
        pendingWithdrawal: state.fundAccount.pendingWithdrawal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
        onInitWithdrawNowApproval: (id, token) =>
            dispatch(actions.initWithdrawNowApproval(id, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingWithdrawals)
