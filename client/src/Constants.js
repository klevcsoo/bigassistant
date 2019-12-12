export const appColours = {
  LIGHT: 'var(--colour-app-light)',
  DARK: 'var(--colour-app-dark)',
  SHADOW: 'var(--colour-app-shadow)',

  BACKGROUND: 'var(--colour-app-background)',
  TEXT: 'var(--colour-app-text)',

  MAIN: 'var(--colour-app-main)',
  HOMEWORK: 'var(--colour-app-homework)',
  HOMEWORK_SHADOW: 'var(--colour-app-homework-shadow)',
  EXAM: 'var(--colour-app-exam)',
  EXAM_SHADOW: 'var(--colour-app-exam-shadow)',

  FACEBOOK: 'var(--colour-facebook)',
  WARNING: 'var(--colour-warning)',
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