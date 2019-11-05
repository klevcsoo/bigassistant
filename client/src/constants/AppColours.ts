class AppColours {
  static LIGHT = '#EBEBEB';
  static DARK = '#616161';
  static SHADOW = '#00000029';

  static BACKGROUND = '#FFFFFF';
  static TEXT = '#000000';
  
  static MAIN = '#32A5FC';
  static HOMEWORK = '#1EE26C';
  static EXAM = '#FD514C';

  static FACEBOOK = '#1778F2';
  static FACEBOOK_DARK = '#0c3b75';

  static WARNING = '#f44336';
  static WARNING_DARK = '#b71c1c';
  static POSITIVE_FEEDBACK = '#76ff03'

  static getDarkModeEnabled = () => {
    let state = localStorage.getItem(darkModeKey) === 'true' ? true : false;
    return state;
  }

  static setDarkModeEnabled = (isEnabled: boolean, noReload: boolean) => {
    AppColours.LIGHT = isEnabled ? darkColours.LIGHT : lightColours.LIGHT;
    AppColours.DARK = isEnabled ? darkColours.DARK : lightColours.DARK;
    AppColours.BACKGROUND = isEnabled ? darkColours.BACKGROUND : lightColours.BACKGROUND;
    AppColours.TEXT = isEnabled ? darkColours.TEXT : lightColours.TEXT;

    let root = document.documentElement;
    root.style.setProperty('--colour-app-light', AppColours.LIGHT);
    root.style.setProperty('--colour-app-dark', AppColours.DARK);
    root.style.setProperty('--colour-app-background', AppColours.BACKGROUND);
    root.style.setProperty('--colour-app-text', AppColours.TEXT);

    localStorage.setItem(darkModeKey, String(isEnabled));
    if (!noReload) window.location.reload(false);
  }
}

const darkModeKey = 'bigassistant_DARK_MODE';

const lightColours = {
  LIGHT: '#EBEBEB',
  DARK: '#616161',
  BACKGROUND: '#FFFFFF',
  TEXT: '#000000'
}

const darkColours = {
  LIGHT: '#2A2A2A',
  DARK: '#818181',
  BACKGROUND: '#000000',
  TEXT: '#FFFFFF'
}

export default AppColours