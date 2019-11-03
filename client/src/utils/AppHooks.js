import { useState, useEffect } from 'react'
import FirebaseHandler from './FirebaseHandler'

export function useClientInfo() {
  const [ clientInfo, setClientInfo ] = useState(null)

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => { setClientInfo(result) })
  }, [])

  // Just for autocompletion 👌
  return !clientInfo ? null : {
    name: clientInfo.name,
    photo: clientInfo.photo,
    classId: clientInfo.classId,
    className: clientInfo.className,
    classRank: clientInfo.classRank,
    facebookId: clientInfo.facebookId,
    joined: clientInfo.joined
  }
}

export function useClassInfo() {
  const clientInfo = useClientInfo()
  const [ classInfo, setClassInfo ] = useState(null)

  FirebaseHandler.getClassInfo((result) => { setClassInfo(result) }, clientInfo.classId)

  return !classInfo ? null : {
    name: classInfo.name,
    photo: classInfo.photo,
    subjects: classInfo.subjects
  }
}

export function useClassmates() {
  const [ classmates, setClassmates ] = useState([])

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId
      FirebaseHandler.readDataContinuously(`/classes/${classId}/members`, (snapshot) => {
        if (snapshot.numChildren === 0) { setClassmates(null); return }
        snapshot.forEach((memberSnapshot) => {
          let uid = memberSnapshot.val()
          FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then(({ data }) => {
            data.uid = uid
            setClassmates([...classmates, data])
          })
        })
      })
    })
  }, [])

  return classmates
}

export function useClassContent(typeOf) {
  const [ contents, setContents ] = useState([])

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readDataContinuously(`/classes/${classId}/${typeOf}`, (snapshot) => {
        setContents([ null ])
        snapshot.forEach((contentSnapshot) => {
          let content = contentSnapshot.val()
          content.id = contentSnapshot.key
          setContents([ ...contents, content ])
        })
      })
    })
  }, [])

  return contents
}

export function useUserInfo(uid, onError) {
  const [ userInfo, setUserInfo ] = useState(null)

  FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then(({ data }) => {
    setUserInfo(data)
  }).catch((err) => {
    console.error(err)
    if (onError) onError(err)
  })

  return userInfo
}