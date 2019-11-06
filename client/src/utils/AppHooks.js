import { useState, useEffect } from 'react'
import FirebaseHandler from './FirebaseHandler'

export function useClientInfo() {
  const [ clientInfo, setClientInfo ] = useState(null)

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      setClientInfo(result)
    })
  }, [])

  return clientInfo
}

export function useClassmates() {
  const [ classmates, setClassmates ] = useState([])

  useEffect(() => {
    FirebaseHandler.getClassId((classId) => {
      FirebaseHandler.readDataContinuously(`/classes/${classId}/members`, (snapshot) => {
        if (snapshot.numChildren() === 0) { setClassmates(null); return }
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

export function useExamsList() {
  const [ exams, setExams ] = useState([])

  useEffect(() => {
    FirebaseHandler.getClassId((classId) => {
      FirebaseHandler.readDataContinuously(`/classes/${classId}/exams`, (snapshot) => {
        if (!snapshot.exists()) { setExams(null); return }
        let examArray = []
        snapshot.forEach((examSnapshot) => {
          let exam = examSnapshot.val()
          exam.id = examSnapshot.key
          examArray.push(exam)
        })
        setExams(examArray)
      })
    })
  }, [])

  return exams
}

export function useHomeworkList() {
  const [ homework, setHomework ] = useState([])

  useEffect(() => {
    FirebaseHandler.getClassId((classId) => {
      FirebaseHandler.readDataContinuously(`/classes/${classId}/homework`, (snapshot) => {
        if (!snapshot.exists()) { setHomework(null); return }
        let hwArray = []
        snapshot.forEach((homeworkSnapshot) => {
          let hw = homeworkSnapshot.val()
          hw.id = homeworkSnapshot.key
          hwArray.push(hw)
        })
        setHomework(hwArray)
      })      
    })
  }, [])

  return homework
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