import React, { Component } from 'react'
import './AppButton.css'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

export class AppMenuButton extends Component {
  render() {
    let facebook = this.props.facebook ? 'app-button-facebook' : ''

    return (
      <React.Fragment>
        <button className={`app-button ${facebook}`} onClick={() => {setTimeout(this.props.onClick, 200)}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto min-content'
          }}>
            <h2 style={{ textAlign: 'left' }}>{this.props.text}</h2>
            <div style={{ padding: '6px 0' }}><ArrowForwardIosRoundedIcon /></div>
          </div>
        </button>
      </React.Fragment>
    )
  }
}

export default AppMenuButton
