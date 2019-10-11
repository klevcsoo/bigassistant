import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

export function LoadingSpinner() {
  return (
    <div style={{
      width: 'fit-content',
      display: 'block',
      margin: 'auto',
      color: /* AppColours.MAIN */ 'black'
    }}>
      <CircularProgress color="inherit" variant="indeterminate" />
    </div>
  )
}

export default LoadingSpinner
