class AppColours {
  static LIGHT = 'var(--colour-app-light)'
  static DARK = 'var(--colour-app-dark)'
  static SHADOW = 'var(--colour-app-shadow)'

  static BACKGROUND = 'var(--colour-app-background)'
  static TEXT = 'var(--colour-app-text)'
  
  static MAIN = 'var(--colour-app-main)'
  static MAIN_MONO = 'var(--colour-app-main-mono)'
  static HOMEWORK = 'var(--colour-app-homework)'
  static EXAM = 'var(--colour-app-exam)'

  static FACEBOOK = 'var(--colour-app-facebook)'
  static FACEBOOK_DARK = 'var(--colour-app-facebook-dark)'

  static WARNING = 'var(--colour-app-warning)'
  static WARNING_DARK = 'var(--colour-app-warning-dark)'

  static getDarkModeEnabled = () => {
    let state = localStorage.getItem(darkModeKey) === 'true' ? true : false
    return state
  }

  static setDarkModeEnabled = (isEnabled) => {
    let root = document.documentElement
    root.style.setProperty('--colour-app-light', isEnabled ? darkColours.LIGHT : lightColours.LIGHT)
    root.style.setProperty('--colour-app-dark', isEnabled ? darkColours.DARK : lightColours.DARK)
    root.style.setProperty('--colour-app-background', isEnabled ? darkColours.BACKGROUND : lightColours.BACKGROUND)
    root.style.setProperty('--colour-app-text', isEnabled ? darkColours.TEXT : lightColours.TEXT)

    localStorage.setItem(darkModeKey, String(isEnabled))
  }

  static makeStatusbarColour = (colour) => {
    switch (colour) {
      case 'var(--colour-app-homework)': return '#7F52FF'
      case 'var(--colour-app-exam)': return '#FC4B95'
      case 'var(--colour-app-background)': return this.getDarkModeEnabled() ? '#000000' : '#FFFFFF'
      default: return this.getDarkModeEnabled() ? '#000000' : '#FFFFFF'
    }
  }
}

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

export default AppColours