import app from 'firebase/app';
import { inProduction } from '../constants/appInfo'
import 'firebase/auth'; import 'firebase/database'; import 'firebase/functions';

const prodConfig = {
  apiKey: "AIzaSyA3nyWdbq3VdnfTpaBEKR4vspv5tX1zc_M",
  authDomain: "bigassistant.firebaseapp.com",
  databaseURL: "https://bigassistant.firebaseio.com",
  projectId: "bigassistant",
  storageBucket: "bigassistant.appspot.com",
  messagingSenderId: "352051169799",
  appId: "1:352051169799:web:58d79fdd20254f6a9678a2"
}

const devConfig = {
  apiKey: "AIzaSyArKGZOSh35hgHbKnOBfSN5abniS-ybc8M",
  authDomain: "bigassistant-dev.firebaseapp.com",
  databaseURL: "https://bigassistant-dev.firebaseio.com",
  projectId: "bigassistant-dev",
  storageBucket: "",
  messagingSenderId: "807197900482",
  appId: "1:807197900482:web:55acfb1504765a93a3455b"
}

const config = inProduction ? prodConfig : devConfig;

class FirebaseHandler {
  static initializeFirebase() {
    if (app.apps.length === 0) app.initializeApp(config);
  
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`Logged in as ${user.displayName}`);
        user.getIdToken(true).then((token) => {
          document.cookie = `__session=${token};max-age=3600;path=/;`;
        });
      }
    });
  }
  
  static getApp() {
    return app;
  }
  static getUser() {
    return app.auth().currentUser
  }
  
  static loginWithFacebook() {
    let provider = new app.auth.FacebookAuthProvider();
    app.auth().signInWithRedirect(provider);
  }
  static loginWithGoogle() {
    let provider = new app.auth.GoogleAuthProvider();
    app.auth().signInWithRedirect(provider);
  }
  static logout() {
    document.cookie = '__session=;max-age=0';
    app.auth().signOut();
  }
  
  static callFunction(name, data) {
    let func = app.functions().httpsCallable(name);
    return func(data);
  }
  
  static async getUserClaims(handler) {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        handler((await user.getIdTokenResult(true)).claims);
      }
    });
  }
  static async getClientInfo(handler) {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.getUserClaims(async (claims) => {
          handler({
            name: user.displayName,
            photo: `${user.photoURL}?height=500`,
            classId: claims.class,
            className: claims.className,
            classRank: claims.classAdmin ? 'admin' : 'tag',
            facebookId: user.providerData[0].providerId === 'facebook.com' ? user.providerData[0].uid : undefined,
            joined: formatDate((await app.database().ref(`/user/${user.uid}/joined`).once('value')).val())
          });
        })
      } else console.warn('No user found');
    });
  }
  
  static readData(path, handler) {
    console.log(`Reading data from ${path}`);
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        app.database().ref(path).once('value', (snapshot) => { handler(snapshot) });
      } else console.log('Cannot read from database, user is not logged in');
    });
  }
  static readDataContinuously(path, handler) {
    console.log(`Attaching data listener to ${path}`);
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        app.database().ref(path).on('value', (snapshot) => { handler(snapshot) })
      } else console.log('Cannot read from database, user is not logged in');
    });
  }
  static writeData(path, data, handler) {
    console.log(`Writing data to ${path}`);
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        app.database().ref(path).set(data, (err) => { if (handler) handler(err) });
      } else console.log('Cannot read from database, user is not logged in');
    });
  }

  static async getExams(handler) {
    this.getClientInfo((claims) => {
      console.log('Info: ', claims);
      this.readDataContinuously(`/classes/${claims.classId}/exams`, (snapshot) => {
        let exams = [];
        snapshot.forEach((examSnapshot) => {
          exams.push(examSnapshot.val());
        });

        handler(exams);
      });
    });
  }
  static getHomework(handler) {
    this.getClientInfo((claims) => {
      this.readDataContinuously(`/classes/${claims.classId}/homework`, (snapshot) => {
        let homeworks = [];
        snapshot.forEach((homeworkSnapshot) => {
          homeworks.push(homeworkSnapshot.val());
        });

        handler(homeworks);
      });
    });
  }
  static getClassmates(handler) {
    this.getClientInfo((claims) => {
      this.readDataContinuously(`/classes/${claims.classId}/members`, (snapshot) => {
        let classmates = [];
        snapshot.forEach((memberSnapshot) => {
          classmates.push(memberSnapshot.val());
        });

        handler(classmates);
      });
    });
  }
}

export default FirebaseHandler

// UTILS
const formatDate = (date) => {
  const innerDate = new Date(date);
  const months = [
      'január', 'február', 'március',
      'április', 'május', 'június',
      'július', 'augusztus', 'szeptember',
      'október', 'november', 'december'
  ];

  const year = innerDate.getFullYear();
  const month = months[innerDate.getMonth()];
  const day = innerDate.getDate();

  return `${year}. ${month} ${day}.`;
}
// UTILS