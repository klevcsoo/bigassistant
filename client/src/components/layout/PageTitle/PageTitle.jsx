import React, { Component } from 'react'
import './PageTitle.css'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AppColours from '../../../constants/appColors';
import { Helmet } from 'react-helmet';

export class PageTitle extends Component {
  gotoLastPage = () => {
    if (this.props.history) this.props.history.goBack();
  }

  render() {
    let bgColor = this.props.type === 'exam' ? AppColours.EXAM : (
      this.props.type === 'homework' ? AppColours.HOMEWORK : AppColours.MAIN
    )

    return (
      <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={bgColor} />
        </Helmet>
        <div className="page-title-container" style={{ background: bgColor }}>
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
