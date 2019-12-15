import admin = require("firebase-admin")
import { UserRecord } from "firebase-functions/lib/providers/auth"

// ---------- FIREBASE ----------
export const getUserHQPicture = (user: UserRecord): string | undefined => {
    if (user.photoURL) return `${user.photoURL}?height=500`
    else return
}

export const makeDatabasePath = (text: string) => {
    return String(text).replace(/[\]\[.$# ]/g, '')
}

export const getAllMembersOfClass = async (id: string): Promise<any[]> => {
    const snapshot = await admin.database().ref(`/classes/${id}/members`).once('value')
    const memberIds: string[] = []
    const memberObjects: any[] = []

    snapshot.forEach((member) => {
        memberIds.push(member.val())
    })

    for (const memberId of memberIds) {
        const member = await admin.auth().getUser(memberId).catch((error) => {
            throw new Error(error)
        })

        memberObjects.push({
            uid: member.uid,
            name: member.displayName,
            photoUrl: member.photoURL
        })
    }

    return memberObjects
}
// ---------- FIREBASE ----------

// ---------- UTILITY ----------
export const isAnyUndefined = (objects: any[]): boolean => {
    let out: boolean
    objects.forEach((element) => {
        if (element === undefined) out = true
    })
    out = false

    return out
}

export const generateInviteCode = (): string => {
    return (+new Date()).toString(36).slice(-8)
}

export const getRandomIntBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

export const getRandomString = () => {
    return (Math.random()).toString(36).slice(-8)
}

export const formatDate = (date: Date | number): string => {
    const innerDate = new Date(date)
    const months = [
        'január', 'február', 'március',
        'április', 'május', 'június',
        'július', 'augusztus', 'szeptember',
        'október', 'november', 'december'
    ]

    const year = innerDate.getFullYear()
    const month = months[innerDate.getMonth()]
    const day = innerDate.getDate()

    return `${year}. ${month} ${day}.`
}
// ---------- UTILITY ----------