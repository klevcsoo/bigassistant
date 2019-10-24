import React, { Component } from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AppColours from '../../constants/appColors';

export class AppBackButton extends Component {
  render() {
    return (
      <button style={{
        width: 50, height: 50,
        background: 'transparent',
        border: 'none',
        zIndex: 200,
        '&:active': {
          background: AppColours.LIGHT
        }
      }} onClick={() => {setTimeout(() => {this.props.history.goBack()}, 200)}}>
        <ArrowBackRoundedIcon />
      </button>
    )
  }
}

export default AppBackButton
