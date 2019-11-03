import React from 'react'

const AppTitle = ({ text }) => {
  return (
    <h1 style={{
      margin: '0 auto 10px auto',
      fontFamily: '"Rubik", sans-serif',
      fontWeight: 500,
      fontSize: '42px',
      textAlign: 'center'
    }}>{text}</h1>
  )
}

export default AppTitle
