import React from 'react'

export default function UnauthorizedPage() {
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <p style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 300
        }}>Nincs jogosultságot megtekinteni ezt az oldalt!<span role="img" aria-label="emoji">😠</span></p>
      </div>
    </React.Fragment>
  )
}
