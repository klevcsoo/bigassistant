import React from 'react'
import AppColours from './../../constants/appColors'

const AppDropDown = ({ onSelected, children }) => {
  return (
    <div style={{ width: 'fit-content', margin: '5px auto' }}>
      <select style={{
        width: 290,
        height: 40,
        padding: '0 15px',
        color: 'white',
        background: AppColours.LIGHT,
        border: 'none',
        borderRadius: 20,
        fontFamily: '"Roboto", sans-serif',
        fontSize: 20,
        fontWeight: 300
      }} onChange={onSelected}>
        {children}
      </select>
    </div>
  )
}

export default AppDropDown
