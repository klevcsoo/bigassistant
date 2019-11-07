import React, { useEffect, useState } from 'react'

const ParallaxHeaderImage = ({ src, header }) => {
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
    <React.Fragment>
      <div style={{
        borderRadius: 10,
        overflow: 'hidden',
        position: header ? 'absolute' : 'static',
        top: 0, left: 0
      }}>
        <div className="parallax-bg" style={{
          width: '100vw', height: '100vw',
          backgroundImage: `url('${src}')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          borderRadius: 10,
          filter: `blur(${scrollPos / 10}px)`,
          transition: '200ms all'
        }}></div>
      </div>
      {header ? <div style={{ height: 'calc(100vw - 60px)' }}></div> : null}
    </React.Fragment>
  )
}

export default ParallaxHeaderImage
