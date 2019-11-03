import React from 'react'

const AppButton = ({ type, facebook, onClick, style, text }) => {
  let classType = type ? `app-button-${type}` : ''
  let classFacebook = facebook ? 'app-button-facebook' : ''

  return (
    <button className={`app-button ${classType} ${classFacebook}`} onClick={() => {setTimeout(onClick, 200)}} style={style}>
      <h2>{text}</h2>
    </button>
  )
}

export default AppButton
