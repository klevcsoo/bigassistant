import React from 'react'
import './AppCard.css'

const AppCardUserClass = ({ className, classRank }) => {
  return (
    <div className="app-card">
      {className ? (
        <p style={{
          margin: '5px 0',
          textAlign: 'center',
          fontWeight: 300,
          fontSize: '20px'
        }}>
          Osztály: <span style={{ fontWeight: 500 }}>{className}</span>
          <br/>
          Rang: <span style={{ fontWeight: 500 }}>{classRank}</span>
        </p>
      ) : (
        <p style={{
          margin: '5px 0',
          textAlign: 'center',
          fontWeight: 300,
          fontSize: '20px'
        }}>
          Nem vagy tagja egy osztálynak sem.
        </p>
      )}
    </div>
  )
}

export default AppCardUserClass
