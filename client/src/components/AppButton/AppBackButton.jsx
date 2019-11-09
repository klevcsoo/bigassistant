import React from 'react'
import AppColours from './../../constants/AppColours'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'


const AppBackButton = ({ history }) => {
  return (
    <button style={{
      width: 50, height: 50,
      background: 'transparent',
      border: 'none',
      zIndex: 200,
      '&:active': {
        background: AppColours.LIGHT
      }
    }} onClick={() => {setTimeout(() => {history.goBack()}, 200)}}>
      <ArrowBackIosRoundedIcon style={{ fill: AppColours.TEXT }} />
    </button>
  )
}

export default AppBackButton
