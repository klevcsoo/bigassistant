import React, { Component } from 'react'

export class AppTitle extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{
          margin: '0 auto 10px auto',
          fontFamily: '"Rubik", sans-serif',
          fontWeight: 500,
          fontSize: '42px',
          textAlign: 'center'
        }}>{this.props.text}</h1>
      </React.Fragment>
    )
  }
}

export default AppTitle
