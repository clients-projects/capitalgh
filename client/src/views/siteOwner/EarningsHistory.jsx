import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'

import Card from '../../components/Card/Card'
import { thWithdrawalArray, tdWithdrawalArray } from '../../variables/Variables'

class TableList extends Component {
    render() {
        return (
            <div className='content'>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                plain
                                title='Your investment'
                                category='History'
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table>
                                        <thead>
                                            <tr>
                                                {thWithdrawalArray.map(
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
                                            {tdWithdrawalArray.map(
                                                (prop, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            {prop.map(
                                                                (prop, key) => {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                key
                                                                            }
                                                                        >
                                                                            {
                                                                                prop
                                                                            }
                                                                        </td>
                                                                    )
                                                                }
                                                            )}
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
}

export default TableList
