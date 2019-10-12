import React, { Component } from 'react'

export class ParallaxHeaderImage extends Component {
  state = {
    scrollPos: 0
  }

  updateScroll = () => {
    this.setState({ scrollPos: window.scrollY * 0.5 });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  }

  render() {
    return (
      <div className="parallax-bg" style={{
        width: '100vw', height: '100vw',
        position: 'absolute', top: 0, left: 0,

        backgroundImage: `url("${this.props.src}")`,
        backgroundPositionX: 'center',
        backgroundPositionY: `${this.state.scrollPos}px`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '20px',

        transition: '0ms all'
      }}></div>
    )
  }
}

// background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
  
//   transition: 0ms all;

export default ParallaxHeaderImage
