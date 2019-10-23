import React, { Component } from 'react'
import FirebaseHandler from '../../utils/FirebaseHandler';
import Routes from '../../constants/routes';

// Components
import PageTitle from './PageTitle/PageTitle';
import PageNavbarSaveable from './PageNavbar/PageNavbarSaveable';

export class SaveablePageLayout extends Component {
  componentDidMount() {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (!user) this.props.history.push(Routes.LOGIN);
    });
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title={this.props.pageTitle} type={this.props.pageType} history={this.props.history} />
        <PageNavbarSaveable type={this.props.pageType} text={this.props.buttonText || 'Mentés'} onClick={this.props.onSave} />
        {this.props.children}
        <div style={{ height: 80 }}></div>
      </React.Fragment>
    )
  }
}

export default SaveablePageLayout
