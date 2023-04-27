import React, { Component } from 'react'
import TableStores from '../components/TableStores'
import data from '../db.json'
export default class Main extends Component {
  state = {
    isLoading: true,
    stores: [],
    error: null,
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
      stores: data.stores,
    })
 
  }
  render() {
    return <TableStores {...this.state} />
  }
}
