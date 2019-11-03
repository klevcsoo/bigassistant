import React from 'react'
import './AppButton.css'

const AppUserButton = ({ onClick, name, photo }) => {
  return (
    <button type="button" className="app-button app-button-classmate" onClick={() => {setTimeout(onClick, 200)}}>
      <div>
        <img src={photo} alt="Profilkép"/>
        <h2>{name}</h2>
      </div>
    </button>
  )
}

export default AppUserButton
