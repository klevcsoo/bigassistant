import React from 'react'
import './AppPopup.css'
import AppButton from '../AppButton/AppButton'

const AppPopup = ({ message, onClose }) => {
  return (
    <div className="app-popup">
      <div>
        <p>{message}</p>
        <AppButton type="highlight" text="OK" onClick={onClose} />
      </div>
    </div>
  )
}

export default AppPopup
