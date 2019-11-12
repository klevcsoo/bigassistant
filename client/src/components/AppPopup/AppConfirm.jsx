import React from 'react'
import './AppPopup.css'
import AppButton from '../AppButton/AppButton'
import { Fade, Slide } from '@material-ui/core'

const AppConfirm = ({ visible, message, onAccept, onReject }) => {
  return (
    <Fade in={visible}>
      <div className="app-popup">
        <Slide direction="up" in={visible}>
          <div>
            <p>{message}</p>
            <div>
              <AppButton type="highlight" text="Tovább" onClick={onAccept} />
              <AppButton type="warning" text="Mégse" onClick={onReject} />
            </div>
          </div>
        </Slide>
      </div>
    </Fade>
  )
}

export default AppConfirm
