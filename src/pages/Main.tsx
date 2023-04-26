import React, { Component } from 'react'
import TableStores from '../components/TableStores'
import { API } from '../consts'
export default class Main extends Component {
  state = {
    isLoading: true,
    stores: [],
    error: null,
  }
  getFetchUsers() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        fetch(API)
          .then((res) => res.json())
          .then((result) =>
            this.setState({
              isLoading: false,
              stores: result,
            })
          )
          .catch(console.log)
      }
    )
  }
  componentDidMount() {
    this.getFetchUsers()
  }
  render() {
    return <TableStores {...this.state} />
  }
}
