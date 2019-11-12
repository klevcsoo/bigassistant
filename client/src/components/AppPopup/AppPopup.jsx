import React from 'react'
import './AppPopup.css'
import AppButton from '../AppButton/AppButton'
import { Slide, Fade } from '@material-ui/core'

const AppPopup = ({ visible, message, onClose }) => {
  return (
    <Fade in={visible}>
      <div className="app-popup">
        <Slide direction="up" in={visible}>
          <div>
            <p>{message}</p>
            <AppButton type="highlight" text="OK" onClick={onClose} />
          </div>
        </Slide>
      </div>
    </Fade>
  )
}

export default AppPopup
