import React, { Component } from 'react'
import FirebaseHandler from '../../utils/FirebaseHandler'
import Routes from '../../constants/routes'
import PageTitle from './PageTitle/PageTitle';
import PageNavbar from './PageNavbar/PageNavbar';

export class MainPageLayout extends Component {
  componentDidMount() {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (!user) this.props.history.push(Routes.LOGIN);
    });
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title={this.props.pageTitle} history={this.props.history}
          noBackButton={this.props.pageActive === 'home'} />
        <PageNavbar active={this.props.pageActive} history={this.props.history} />
        {this.props.children}
        <div style={{ height: 80 }}></div>
      </React.Fragment>
    )
  }
}

export default MainPageLayout
