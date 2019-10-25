import React, { Component } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler';
import LocalizationHandler from '../../../utils/LocalizationHandler';
import AppColours from '../../../constants/appColors';

// Components
import AppBackButton from '../../AppButton/AppBackButton';
import LoadingSpinner from '../../LoadingSpinner';
import AppTitle from '../../AppTitle';
import AppDivider from '../../AppDivider';
import AppUserButton from '../../AppButton/AppUserButton';

export class InspectHomeworkPage extends Component {
  state = {
    homeworkInfo: null,
    homeworkNotFound: false,
    creatorInfo: null
  }

  componentDidMount() {
    let homeworkId = this.props.match.params.id;
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readData(`/classes/${classId}/homework/${homeworkId}`, (snapshot) => {
        if (!snapshot.exists()) this.setState({ homeworkNotFound: true, homeworkInfo: {} });
        else {
          this.setState({ homeworkInfo: snapshot.val() }, () => {
            FirebaseHandler.callFunction('getUserInfo', {
              uid: this.state.homeworkInfo.creator
            }).then(({ data }) => {
              this.setState({ creatorInfo: data });
            }).catch((err) => {
              console.log(err);
              this.setState({ creatorInfo: {} });
            });
          });
        }
      });
    });
  }

  render() {
    return (
      <div style={{
        width: '100vw', height: '100vh',
        boxSizing: 'border-box',
        borderBottom: `5px solid ${AppColours.HOMEWORK}`
      }}>
        <AppBackButton history={this.props.history} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {!this.state.homeworkInfo ? <LoadingSpinner /> : this.state.homeworkNotFound ? (
            <div style={{ width: '100vw' }}>
            <p style={{
              margin: 10, padding: 0,
              textAlign: 'center',
              fontSize: 100
            }}><span role="img" aria-label="emoji">🤷‍♀️</span></p>
            <AppTitle text="Nem található ilyen házi feladat." />
          </div>
          ) : (
            <div style={{ width: '100vw' }}>
              <AppTitle text={this.state.homeworkInfo.title} />
              <p style={primaryPropStyle}>
                Tantárgy: <span style={{
                  fontWeight: 500
                }}>{this.state.homeworkInfo.subject}</span>
              </p>
              <p style={primaryPropStyle}>
                Időpont: <span style={{
                  fontWeight: 500
                }}>{LocalizationHandler.formatDate(this.state.homeworkInfo.date)}</span>
              </p>
              <AppDivider />
              {!this.state.homeworkInfo.notes ? null : (
                <React.Fragment>
                  <p style={secondaryPropStyle}>{this.state.homeworkInfo.notes}</p>
                  <AppDivider />
                </React.Fragment>
              )}
              <p style={secondaryPropStyle}>
                Létrehozva: {LocalizationHandler.formatDate(this.state.homeworkInfo.createdAt)}
              </p>
              {!this.state.creatorInfo ? <LoadingSpinner /> : (
                <AppUserButton {...this.state.creatorInfo} />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const primaryPropStyle = {
  margin: 5,
  textAlign: 'center',
  fontSize: 22,
  fontWeight: 300
}

const secondaryPropStyle = {
  margin: 5,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 400
}

export default InspectHomeworkPage
