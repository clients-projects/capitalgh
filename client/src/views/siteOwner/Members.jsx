import React, { useState, useEffect, useRef } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import * as orderAction from '../../store/actions/burgerIndex'

import Card from '../../components/Card/Card'


const Members = (props) => {
    const [allUsers, setAllUsers] = useState([])

    const gottenAllUsers = useRef()
    useEffect(() => {
        if (!gottenAllUsers.current) {
            if (props.tokenId) {
                props.onInitGetUsers(props.tokenId)
            }
            gottenAllUsers.current = true
        } else {
            if (props.getUsers) {
                setAllUsers(props.getUsers)
            }
        }
    }, [props])

    const handleApproval = (id) => {
        console.log({id})
        for (let i = 0; i < props.getUsersId.length; i++) {
            if (id === i) {
                props.history.push(
                    '/admin/member?id=' + props.getUsersId[i]._id
                )
            }
        }
    }

          const fetchedAllUsers = []


      if (allUsers.length > 0) {
          allUsers.map((value) => {
              const { userNO, username, status, email, updatedAt } = value
              
              console.log({value})
              fetchedAllUsers.push({
                  id: userNO,
                  username,
                  status,
                  email,
                  date: updatedAt,
                  action: (
                      <button
                          className='btn1'
                          onClick={() => handleApproval(userNO)}
                      >
                          {props.loading ? 'Loading...' : 'View'}
                      </button>
                  ),
              })
          })
      }

      const columns = [
          { dataField: 'id', text: 'Id', sort: true },
          { dataField: 'username', text: 'Username', sort: true },
          { dataField: 'email', text: 'email', sort: true },
          { dataField: 'status', text: 'status', sort: true },
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
                            title='Members'
                            category=''
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <ToolkitProvider
                                    bootstrap4
                                    data={fetchedAllUsers}
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
        getUsers: state.user.getUsers.getUser,
        getUsersId: state.user.getUsers.getUsersId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitGetUsers: (token) => dispatch(orderAction.initGetUsers(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Members)
