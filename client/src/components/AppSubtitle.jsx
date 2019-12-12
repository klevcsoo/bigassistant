import React from 'react'

const AppSubtitle = ({ text }) => {
  return (
    <h1 style={{
      margin: 10,
      padding: 0,
      textAlign: 'center',
    
      color: 'var(--colour-app-dark)',
      fontFamily: 'sans-serif',
      fontWeight: 500,
      fontSize: 22,
    }}>{text}</h1>
  )
}

export default AppSubtitle
