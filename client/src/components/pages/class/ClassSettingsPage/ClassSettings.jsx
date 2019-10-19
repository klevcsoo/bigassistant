import React, { Component } from 'react'
import FirebaseHandler from '../../../../utils/FirebaseHandler'
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// Components
import LoadingSpinner from '../../../LoadingSpinner';
import UnauthorizedPage from '../../auth/UnauthorizedPage/UnauthorizedPage';
import UserProfileHeader from '../../../layout/UserProfileHeader';
import AppDivider from '../../../AppDivider';
import AppInput from '../../../AppInput/AppInput';
import AppColours from '../../../../constants/appColors';
import SaveablePageLayout from '../../../layout/SaveablePageLayout';
import AppButton from '../../../AppButton/AppButton';
import AppPopup from '../../../AppPopup/AppPopup';

export class ClassSettings extends Component {
  state = {
    clientInfo: null,
    classInfo: null,
    subjectCurrent: '',
    subjectAdding: false,
    classSaving: false,
    classSaved: false,
    popupVisible: false,
    popupMessage: ''
  }

  displayPopup = (message) => {
    this.setState({
      popupMessage: message,
      popupVisible: true
    })
  }
  closePopup = () => {
    if (this.state.classSaved) this.props.history.goBack();
    else {
      this.setState({
        popupVisible: false,
        popupMessage: '',
        classSaving: false
      });
    }
  }

  addSubject = () => {
    if (this.state.subjectCurrent.length === 0 || this.state.subjectCurrent === ' ') return;
    this.setState((state) => {
      state.classInfo.subjects.push(state.subjectCurrent);
      return state;
    });
  }

  deleteClass = () => {
    console.log('Not yet available');
  }

  updateClassSettings = () => {
    this.setState({ classSaving: true });
    FirebaseHandler.callFunction('updateClass', this.state.classInfo).then(() => {
      this.setState({ classSaved: true }, () => {
        this.displayPopup('Osztálybeállítások elmentve!');
      });
    }).catch((err) => {
      console.log(err);
      this.displayPopup(`Sikertelen mentés! Hibaüzenet: ${err}`);
    });
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      this.setState({ clientInfo: result });
      FirebaseHandler.getClassInfo((classResult) => {
        this.setState({ classInfo: classResult, classPhotoLink: classResult.photo });
      }, result.classId);
    });
  }

  render() {
    return (
      <SaveablePageLayout pageTitle="Osztály beállítások" onSave={this.updateClassSettings} history={this.props.history}>
        {!this.state.classSaving ? null : (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, bottom: 0, right: 0,
            zIndex: 90,
            background: AppColours.SHADOW
          }}><div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)'
          }}><LoadingSpinner /></div></div>
        )}
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.closePopup} /> : null}
        {!this.state.classInfo ? <LoadingSpinner /> : (
          <React.Fragment>
            {this.state.clientInfo.classRank !== 'admin' ? <UnauthorizedPage /> : (
              <div>
                <UserProfileHeader name={this.state.classInfo.name} photo={this.state.classInfo.photo} />
                <AppDivider />
                <AppInput placeholder="Osztály neve" text={this.state.classInfo.name}
                  onTextChanged={(text) => {this.setState((state) => {
                    state.classInfo.name = text;
                    return state;
                  })}} />
                <AppInput placeholder="Kép link" text={this.state.classInfo.photo}
                  onTextChanged={(text) => {this.setState((state) => {
                    state.classInfo.photo = text;
                    return state;
                  })}}
                />
                <AppDivider />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 42px',
                  width: 290,
                  margin: '5px auto'
                }}>
                  <AppInput placeholder="Tantárgy hozzáadása" text={this.state.subjectCurrent}
                    onTextChanged={(text) => {this.setState({ subjectCurrent: text })}}
                    style={{
                      margin: 0,
                      minWidth: 0,
                      width: 'calc(100% - 42px)'
                    }} />
                  {this.state.subjectAdding ? <LoadingSpinner /> : (
                    <button style={{
                      width: 42,
                      height: 42,
                      background: AppColours.LIGHT,
                      border: 'none',
                      borderRadius: '100%'
                    }} onClick={this.addSubject}><AddRoundedIcon /></button>
                  )}
                </div>
                <div>
                  {this.state.classInfo.subjects.map((subject) => (
                    <div key={Math.random()} style={{
                      width: 290,
                      margin: '5px auto',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr'
                    }}>
                      <h1 style={{
                        margin: 5, textAlign: 'left', fontSize: 18, fontWeight: 300
                      }}>{subject}</h1>
                      <h1 style={{
                        margin: 5, textAlign: 'right', fontSize: 18, fontWeight: 300, color: AppColours.WARNING
                      }} onClick={() => {this.setState((state) => {
                        state.classInfo.subjects.splice(state.classInfo.subjects.indexOf(subject), 1);
                        return state;
                      })}}>Eltávolítás</h1>
                    </div>
                  ))}
                </div>
                <AppDivider />
                <AppButton type="warning" text="Osztály törlése" onClick={this.deleteClass} />
              </div>
            )}
          </React.Fragment>
        )}
      </SaveablePageLayout>
    )
  }
}

export default ClassSettings
