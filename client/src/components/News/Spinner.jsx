import React, { Component } from 'react'
import Loading from './Loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <img className="d-flex justify-content-center text-center" src={Loading} alt="Loading" />
    )
  }
}
