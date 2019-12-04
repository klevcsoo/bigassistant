import React from 'react'
import './AppButton.css'
import { useHistory } from 'react-router-dom'
import { routes } from '../../Constants'

const AppUserButton = ({ name, photo, uid, disableClick }) => {
  const history = useHistory()

  return (
    <button type="button" className="app-button app-button-classmate" onClick={() => {
      if (!disableClick) {
        setTimeout(() => {
          history.push(`${routes.USER}/${uid}`)
        }, 200)
      }
    }}>
      <div>
        <img src={photo} alt="Profilkép"/>
        <h2>{name}</h2>
      </div>
    </button>
  )
}

export default AppUserButton
