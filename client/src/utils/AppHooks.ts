import { useState, useEffect } from 'react'
import FirebaseHandler from './FirebaseHandler'
import { ClassInfo, ClientInfo, UserInfo, ClassContentInfo } from './UtilClasses'

export function useClientInfo(): ClientInfo {
  const [ clientInfo, setClientInfo ] = useState(new ClientInfo())

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => { setClientInfo(result) })
  }, [])

  // Just for autocompletion 👌
  return clientInfo
}

export function useClassInfo(): ClassInfo {
  const clientInfo = useClientInfo()
  const [ classInfo, setClassInfo ] = useState(new ClassInfo())

  FirebaseHandler.getClassInfo((result) => { setClassInfo(result) }, clientInfo.classId)

  return classInfo
}

export function useClassmates(): UserInfo[] {
  const [ classmates, setClassmates ] = useState(new Array<UserInfo>())

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId
      FirebaseHandler.readDataContinuously(`/classes/${classId}/members`, (snapshot) => {
        if (snapshot.numChildren() === 0) { setClassmates([]); return }
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

export function useClassContent(typeOf: 'exams' | 'homework'): ClassContentInfo[] {
  const [ contents, setContents ] = useState(new Array<ClassContentInfo>())

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readDataContinuously(`/classes/${classId}/${typeOf}`, (snapshot) => {
        setContents([])
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

export function useUserInfo(uid: string, onError: (err: any) => void) {
  const [ userInfo, setUserInfo ] = useState(null)

  FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then(({ data }) => {
    setUserInfo(data)
  }).catch((err) => {
    console.error(err)
    if (onError) onError(err)
  })

  return userInfo
}