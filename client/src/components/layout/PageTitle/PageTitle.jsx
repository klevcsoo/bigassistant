import React, { Component } from 'react'
import './PageTitle.css'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

export class PageTitle extends Component {
  gotoLastPage = () => {
    if (this.props.history) this.props.history.goBack();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-title-container">
          {!this.props.noBackButton ? (
            <button onClick={this.gotoLastPage}><ArrowBackRoundedIcon /></button>
          ) : null}
          <h1 className="noselect">{this.props.title || "BIGAssistant"}</h1>
        </div>
        <div style={{ height: '80px' }}></div>
      </React.Fragment>
    )
  }
}

export default PageTitle
