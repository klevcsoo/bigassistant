import React, { Component } from 'react'
import Routes from '../../../../constants/routes'
import FirebaseHandler from '../../../../utils/FirebaseHandler'

// Components
import MainPageLayout from '../../../layout/MainPageLayout'
import AppPopup from '../../../AppPopup/AppPopup'
import AppButton from '../../../AppButton/AppButton'
import AppDivider from '../../../AppDivider'
import AppCardClassContent from '../../../AppCard/AppCardClassContent'
import LoadingSpinner from '../../../LoadingSpinner'

export class HomeworkPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    homework: [],
    classId: null
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readDataContinuously(`/classes/${classId}/homework`, (snapshot) => {
        this.setState({ homework: [], classId: classId });
        snapshot.forEach((homeworkSnapshot) => {
          let hw = homeworkSnapshot.val();
          hw.id = homeworkSnapshot.key;
          this.setState((state) => {
            let updatedState = state;
            updatedState.homework.push(hw);
            return updatedState;
          });
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.state.classId) {
      FirebaseHandler.removeDataListener(`/classes/${this.state.classId}/homework`);
    } else console.log('No listener attached.');
  }

  render() {
    return (
      <MainPageLayout pageTitle="Házi feladat" pageActive="homework" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <AppButton text="Hozzáadás" onClick={() => {this.props.history.push(Routes.HOMEWORK_ADD)}} />
        <AppDivider />
        <div>
          {this.state.homework.length === 0 ? <LoadingSpinner /> : null}
          {this.state.homework.map((hw) => (
            <AppCardClassContent type="homework" {...hw} key={hw.id} />
          ))}
        </div>
      </MainPageLayout>
    )
  }
}

export default HomeworkPage
