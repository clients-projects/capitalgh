// import React, { useState, useEffect, useRef } from 'react'
// import { Grid, Row, Col, Table } from 'react-bootstrap'
// import { connect } from 'react-redux'

// import * as actions from '../../store/actions/burgerIndex'

// import Card from '../../components/Card/Card'
// //import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

// const thDepositHistoryArray = [
//     'No',
//     'Username',
//     'Amount',
//     'Plan',
//     'Date'
// ]




// const AllUsersDepositHistory = (props) => {
//     const [allUsersDeposit, setAllUsersDeposit] = useState([])

//     const gottenAllUsersDeposit = useRef()
//     useEffect(() => {
//         if (!gottenAllUsersDeposit.current) {
//             if (props.tokenId) {
//                 props.onInitGetFunds(props.tokenId)
//             }
//             gottenAllUsersDeposit.current = true
//         } else {
//             if (props.allUsersDeposit) {
//                 setAllUsersDeposit(props.allUsersDeposit)
//             }
//         }
//     }, [props])

//     return (
//         <div className='content'>
//             <Grid fluid>
//                 <Row>
//                     <Col md={12}>
//                         <Card
//                             plain
//                             title='Users Deposits'
//                             category='Deposit History of all the users'
//                             ctTableFullWidth
//                             ctTableResponsive
//                             content={
//                                 <Table>
//                                     <thead>
//                                         <tr>
//                                             {thDepositHistoryArray.map(
//                                                 (prop, key) => {
//                                                     return (
//                                                         <th key={key}>
//                                                             {prop}
//                                                         </th>
//                                                     )
//                                                 }
//                                             )}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {allUsersDeposit.map((prop, key) => {
//                                             return (
//                                                 <tr key={key}>
//                                                     {Object.values(prop).map(
//                                                         (prop) => {
//                                                             return (
//                                                                 <td key={key}>
//                                                                     {prop}
//                                                                 </td>
//                                                             )
//                                                         }
//                                                     )}

//                                                     {/* <button className='btn1'>
//                                                         view
//                                                     </button> */}
//                                                 </tr>
//                                             )
//                                         })}
//                                     </tbody>
//                                 </Table>
//                             }
//                         />
//                     </Col>
//                 </Row>
//             </Grid>
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     console.log({state})
//     return {
//         tokenId: state.auth.tokenId,
//         userId: state.auth.userId,
//         allUsersDeposit: state.fundAccount.allUsersDeposit,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitGetFunds: (token) => dispatch(actions.initGetFunds(token)),
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AllUsersDepositHistory)

// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

function App() {

  const products = [
    { id: 1, name: 'George', animal: 'Monkey' },
    { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
    { id: 3, name: 'Alice', animal: 'Giraffe' },
    { id: 4, name: 'Foster', animal: 'Tiger' },
    { id: 5, name: 'Tracy', animal: 'Bear' },
    { id: 6, name: 'Joesph', animal: 'Lion' },
    { id: 7, name: 'Tania', animal: 'Deer' },
    { id: 8, name: 'Chelsea', animal: 'Tiger' },
    { id: 9, name: 'Benedict', animal: 'Tiger' },
    { id: 10, name: 'Chadd', animal: 'Lion' },
    { id: 11, name: 'Delphine', animal: 'Deer' },
    { id: 12, name: 'Elinore', animal: 'Bear' },
    { id: 13, name: 'Stokes', animal: 'Tiger' },
    { id: 14, name: 'Tamara', animal: 'Lion' },
    { id: 15, name: 'Zackery', animal: 'Bear' }
  ];

  const columns = [
    { dataField: 'id', text: 'Id', sort: true },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'animal', text: 'Animal', sort: true },
    { dataField: 'animal', text: 'Animal', sort: true },
    { dataField: 'animal', text: 'Animal', sort: true },
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  const { SearchBar, ClearSearchButton } = Search;

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>Export to CSV</button>
      </div>
    );
  };

  return (
    <div className="App">
      <h5>React Bootstrap Table Next with Sorting, Pagination and Search</h5>

      <ToolkitProvider
        bootstrap4
        keyField='id'
        data={products}
        columns={columns}
        search
        exportCSV
      >
        {
          props => (
            <div>
              <h6>Input something at below input field:</h6>
              <SearchBar  {...props.searchProps} />
              <ClearSearchButton  {...props.searchProps} />
              <hr />
              <MyExportCSV {...props.csvProps} />
              <BootstrapTable
                defaultSorted={defaultSorted}
                pagination={pagination}
                {...props.baseProps}
              />

            </div>
          )
        }
      </ToolkitProvider>

    </div>
  );
}

export default App;
