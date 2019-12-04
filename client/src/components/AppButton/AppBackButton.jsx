import React from 'react'
import { appColours } from './../../Constants'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'


const AppBackButton = ({ history }) => {
  return (
    <button style={{
      width: 50, height: 50,
      background: 'transparent',
      border: 'none',
      zIndex: 200,
      '&:active': {
        background: appColours.LIGHT
      }
    }} onClick={() => {setTimeout(() => {history.goBack()}, 200)}}>
      <ArrowBackIosRoundedIcon style={{ fill: appColours.TEXT }} />
    </button>
  )
}

export default AppBackButton
