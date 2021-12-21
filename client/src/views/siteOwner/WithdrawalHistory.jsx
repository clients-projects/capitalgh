import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

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

      const allDeposits = []

      if (allUsersWithdrawal.length > 0) {
          allUsersWithdrawal.map((value) => {
              const { fundNO, creator, amount, planName, updatedAt } = value
              allDeposits.push({
                  id: fundNO,
                  username: creator,
                  amount,
                  plan: planName,
                  date: updatedAt,
              })
          })
      }

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
                            title='Users Withdrawals'
                            category='Withdrawal History of all the users'
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table>
                                    <thead>
                                        <tr>
                                            {thWithdrawalHistoryArray.map(
                                                (prop, key) => {
                                                    return (
                                                        <th key={key}>
                                                            {prop}
                                                        </th>
                                                    )
                                                }
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsersWithdrawal.map(
                                            (prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(
                                                            prop
                                                        ).map((prop) => {
                                                            return (
                                                                <td key={key}>
                                                                    {prop}
                                                                </td>
                                                            )
                                                        })}
                                                       
                                                        {/* <button className='btn1'>
                                                        view
                                                    </button> */}
                                                    </tr>
                                                )
                                            }
                                        )}
                                    </tbody>
                                </Table>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersWithdrawalHistory)
