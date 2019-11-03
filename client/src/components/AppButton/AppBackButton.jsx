import React from 'react'
import AppColours from './../../constants/appColors'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'


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
      <ArrowBackRoundedIcon style={{ fill: AppColours.TEXT }} />
    </button>
  )
}

export default AppBackButton
