import React, { useEffect, useState } from 'react'

const ParallaxHeaderImage = ({ src }) => {
  const [ scrollPos, setScrollPos ] = useState(0)

  const updateScroll = () => {
    setScrollPos(window.scrollY * 0.5)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])
  
  return (
    <div className="parallax-bg" style={{
      width: '100vw', height: '100vw',
      position: 'absolute', top: 0, left: 0,
      backgroundImage: `url("${src}")`,
      backgroundPositionX: 'center',
      backgroundPositionY: `${scrollPos}px`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: '20px',
      transition: '0ms all'
    }}></div>
  )
}

export default ParallaxHeaderImage
