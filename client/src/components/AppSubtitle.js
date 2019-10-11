import React, { Component } from 'react'

export class AppSubtitle extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{
          margin: 10,
          padding: 0,
          textAlign: 'center',
        
          color: 'var(--colour-app-dark)',
          fontFamily: '"Roboto", sans-serif',
          fontWeight: 500,
          fontSize: 22,
        }}>{this.props.text}</h1>
      </React.Fragment>
    )
  }
}

export default AppSubtitle
