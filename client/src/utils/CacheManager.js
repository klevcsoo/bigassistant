import FirebaseHandler from './FirebaseHandler'

const appCache = {
  classmates: {}
}

const classmateListListeners = []

export function initializeCache() {
  console.log('Initializing cache...')

  // Update classmates
  FirebaseHandler.getClassId((classId) => {
    FirebaseHandler.readDataContinuously(`/classes/${classId}/members`, (snapshot) => {
      if (snapshot.numChildren() === 0) { appCache.classmates = {}; return }
      snapshot.forEach((memberSnapshot) => {
        let uid = memberSnapshot.val()
  
        if (!appCache.classmates[uid]) {
          FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then(({ data }) => {
            appCache.classmates[uid] = { ...data, uid: uid }
            
            let classmatesArray = []
            for (let member in appCache.classmates) {
              classmatesArray.push(appCache.classmates[member])
            }
            classmateListListeners.forEach((listener) => listener(classmatesArray))
          }).catch((err) => console.log(err))
        }        
      })
    })
  })
}

export function onClassmates(listener) {
  classmateListListeners.push(listener)

  let classmatesArray = []
  for (let member in appCache.classmates) {
    classmatesArray.push(appCache.classmates[member])
  }
  classmateListListeners.forEach((listener) => listener(classmatesArray))
}

export function onUserInfo(uid, listener, onError) {
  if (!appCache.classmates[uid]) {
    FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then(({ data }) => {
      listener(data)
    }).catch((err) => { if (onError) onError(err) })
  } else {
    listener(appCache.classmates[uid])
  }
}