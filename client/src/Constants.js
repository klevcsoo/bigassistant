const darkModeKey = 'bigassistant_DARK_MODE'
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

export const appColours = {
  LIGHT: 'var(--colour-app-light)',
  DARK: 'var(--colour-app-dark)',
  SHADOW: 'var(--colour-app-shadow)',

  BACKGROUND: 'var(--colour-app-background)',
  TEXT: 'var(--colour-app-text)',

  MAIN: 'var(--colour-app-main)',
  MAIN_MONO: 'var(--colour-app-main-mono)',
  HOMEWORK: 'var(--colour-app-homework)',
  EXAM: 'var(--colour-app-exam)',

  FACEBOOK: 'var(--colour-app-facebook)',
  FACEBOOK_DARK: 'var(--colour-app-facebook-dark)',

  WARNING: 'var(--colour-app-warning)',
  WARNING_DARK: 'var(--colour-app-warning-dark)',

  getDarkModeEnabled: () => {
    let state = localStorage.getItem(darkModeKey) === 'true' ? true : false
    return state
  },

  setDarkModeEnabled: (isEnabled) => {
    let root = document.documentElement
    root.style.setProperty('--colour-app-light', isEnabled ? darkColours.LIGHT : lightColours.LIGHT)
    root.style.setProperty('--colour-app-dark', isEnabled ? darkColours.DARK : lightColours.DARK)
    root.style.setProperty('--colour-app-background', isEnabled ? darkColours.BACKGROUND : lightColours.BACKGROUND)
    root.style.setProperty('--colour-app-text', isEnabled ? darkColours.TEXT : lightColours.TEXT)

    localStorage.setItem(darkModeKey, String(isEnabled))
  },

  makeStatusbarColour: (colour) => {
    switch (colour) {
      case 'var(--colour-app-homework)': return '#7F52FF'
      case 'var(--colour-app-exam)': return '#FC4B95'
      case 'var(--colour-app-background)': return appColours.getDarkModeEnabled() ? '#000000' : '#FFFFFF'
      default: return appColours.getDarkModeEnabled() ? '#000000' : '#FFFFFF'
    }
  }
}

export const appInfo = {
  version: '19.1204.1',
  defaultClassPhoto: 'https://firebasestorage.googleapis.com/v0/b/bigassistant.appspot.com/o/default-class-photo.png?alt=media&token=afd84e32-c0f6-4563-be8b-b326d3099972'
}

export const routes = {
  ADMIN_CONSOLE: '/admin-console',
  LOGIN: '/login',
  USER_PROFILE: '/user/:uid',
  CLASS_CREATE: '/class/create',
  CLASS_JOIN: '/class/join',
  CLASS_SETTINGS: '/class/settings',
  EXAMS_ADD: '/exams/add',
  EXAMS_INSPECT: '/exams/:id',
  HOMEWORK_ADD: '/homework/add',
  HOMEWORK_INSPECT: '/homework/:id',
  CLASS: '/class',
  HOMEWORK: '/homework',
  HOME: '/',
  EXAMS: '/exams',
  USER: '/user',
  ABOUT: '/about',
  LOGIN_OPTIONS: '/user/login-providers',
  DELETE_ACCOUNT: '/user/delete-account'
}