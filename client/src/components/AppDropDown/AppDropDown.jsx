import React, { Component } from 'react'
import AppColours from '../../constants/appColors'

export class AppDropDown extends Component {
  render() {
    return (
      <div style={{ width: 'fit-content', margin: '5px auto' }}>
        <select style={{
          width: 290,
          height: 40,
          padding: '0 15px',
          background: AppColours.LIGHT,
          border: 'none',
          borderRadius: 20,
          fontFamily: '"Roboto", sans-serif',
          fontSize: 20
        }} onChange={this.props.onSelected}>
          {this.props.children}
        </select>
      </div>
    )
  }
}

export default AppDropDown