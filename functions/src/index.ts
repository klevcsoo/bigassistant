// ---------- IMPORTS ----------
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import utils = require('./utils')
import errors from './errors'
// ---------- IMPORTS ----------

// ---------- ADMIN FUNCTIONALITY SETUP ----------
const serviceAccount = require('../service-account.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
})
// ---------- ADMIN FUNCTIONALITY SETUP ----------

// ---------- CLOUD FUNCTION CALLABLES ----------
exports.joinClass = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw errors.unauthenticated()

    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })

    if ((await admin.database().ref(`/users/${user.uid}/class`).once('value')).exists()) {
        throw errors.alreadyInClass()
    }

    // If the user is trying to join an existing class, the inviteCode contains a value,
    // but if the user is trying to create a class, the className holds a value.
    //! One of them is always undefined.
    let className: string = data ? data.name : null
    let inviteCode: string = utils.makeDatabasePath(data.inviteCode)

    // These are only defined, if the class is just to be created.
    const classPictureUrl: string = data.photo
    const classClosed: boolean = data.closed

    if (className === undefined && inviteCode === undefined) {
        throw errors.noClassNameOrCode()
    }

    let classId: string = (await admin.database().ref(`/classInvites/${inviteCode}`).once('value')).val()
    const classSnapshot = await admin.database().ref(`/classes/${classId}`).once('value').catch((err) => {
        throw errors.internal(err)
    })

    if (!classSnapshot.exists()) {
        const classRef = admin.database().ref('/classes').push()
        classId = String(classRef.key)
        inviteCode = utils.generateInviteCode()

        classRef.set({
            metadata: {
                name: className,
                numberOfMembers: 1,
                admin: context.auth.uid,
                createdAt: new Date(),
                pictureUrl: classPictureUrl,
                closed: classClosed,
                inviteCode: inviteCode
            },
            members: [context.auth.uid]
        }).catch((err) => {
            throw errors.internal(err)
        })

        admin.database().ref(`/classInvites/${inviteCode}`).set(classId).catch((err) => {
            throw errors.internal(err)
        })

        admin.auth().setCustomUserClaims(context.auth.uid, {
            classAdmin: true
        }).catch((err) => { throw errors.internal(err) })
    } else {
        className = classSnapshot.child('metadata/name').val()

        const memberIndex = classSnapshot.child('members').numChildren()
        admin.database().ref(classSnapshot.child(`members/${memberIndex}`).ref).set(context.auth.uid).catch((err) => {
            throw errors.internal(err)
        })
    }

    admin.database().ref(`/users/${user.uid}/class`).set(classId).catch((err) => {
        throw errors.internal(err)
    })

    return {classId: classId}
})

exports.leaveClass = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw errors.unauthenticated()

    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })
    const isAdmin = user.customClaims ? (<any>user.customClaims).classAdmin : false
    const classId = (await admin.database().ref(`/users/${user.uid}/class`).once('value')).val()
    if (classId === undefined) throw errors.classNotFound()

    // If present, the user with data.uid will be removed of the invoking user is an admin
    const userToRemove = data ? data.uid : null

    console.log(`Leaving class with id ${classId}`)

    const classSnapshot = await admin.database().ref(`/classes/${classId}`).once('value').catch((err) => {
        throw errors.internal(err)
    })

    if (isAdmin) {
        if (userToRemove) {
            console.log(`Removing ${userToRemove} from their class`)

            admin.auth().setCustomUserClaims(userToRemove, {
                classAdmin: null
            }).catch((err) => { throw errors.internal(err) })

            admin.database().ref(`/users/${userToRemove}/class`).remove().catch((err) => {
                throw errors.internal(err)
            })
    
            classSnapshot.child('members/').ref.once('value').then((snapshot) => {
                snapshot.forEach((child) => {
                    if (child.val() === userToRemove.uid) {
                        child.ref.remove().catch((err) => {
                            throw errors.internal(err)
                        })
                    }
                })
            }).catch((err) => { throw errors.internal(err) })
        } else {
            classSnapshot.child('members').forEach((member) => {
                admin.database().ref(`/users/${member.val()}/class`).remove().catch((err) => {
                    throw errors.internal(err)
                })
            })

            classSnapshot.ref.remove().catch((err) => { throw errors.internal(err) })

            const inviteCode = classSnapshot.child('/metadata/inviteCode')
            admin.database().ref(`/classInvites/${inviteCode.val()}`).remove().catch((err) => {
                throw errors.internal(err)
            })
        }
    } else {
        admin.auth().setCustomUserClaims(user.uid, {
            classAdmin: null
        }).catch((err) => { throw errors.internal(err) })

        classSnapshot.child('members/').ref.once('value').then((snapshot) => {
            snapshot.forEach((child) => {
                if (child.val() === user.uid) {
                    child.ref.remove().catch((err) => { throw errors.internal(err) })
                }
            })
        }).catch((err) => { throw errors.internal(err) })

        admin.database().ref(`/users/${user.uid}/class`).remove().catch((err) => {
            throw errors.internal(err)
        })
    }

    return {classId: classId}
})

exports.addSubjectToClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated()
    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })
    const classIdSnapshot = await admin.database().ref(`/users/${user.uid}/class`).once('value')
    if (!classIdSnapshot.exists()) throw errors.classNotFound()
    if (!(<any>user.customClaims).classAdmin) throw errors.permissionDenied()

    const subjectName: string = data.name
    if (!subjectName) throw errors.noSubject()

    await admin.database().ref(`/classes/${classIdSnapshot.val()}/metadata/subjects`).push(subjectName).catch((err) => {
        throw errors.internal(err)
    })
})

exports.addContentToClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated()
    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })
    const classIdSnapshot = await admin.database().ref(`/users/${user.uid}/class`).once('value')
    if (!classIdSnapshot.exists()) throw errors.classNotFound()

    const type = data.typeOf
    const content = data.content
    if (!type || !content) throw errors.noContent()
    if (type !== 'homework' && type !== 'exams') throw errors.invalidContentType()
    if (!(content.title) || !(content.subject) || !(content.date)) throw errors.noContent()

    content.createdAt = new Date().getTime()
    content.creator = user.uid

    console.log(content)

    await admin.database().ref(`/classes/${classIdSnapshot.val()}/${type}`).push(content).catch((err) => {
        throw errors.internal(err)
    })
})

exports.removeContentFromClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated()
    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })
    const classIdSnapshot = await admin.database().ref(`/users/${user.uid}/class`).once('value')
    if (!classIdSnapshot.exists()) throw errors.classNotFound()

    const type = data.type
    const id = data.id
    if (!type || !id) throw errors.noContent()

    await admin.database().ref(`/classes/${classIdSnapshot.val()}/${type}/${id}`).remove().catch((err) => {
        throw errors.internal(err)
    })
})

exports.updateClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated() 
    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw errors.internal(err)
    })
    const classIdSnapshot = await admin.database().ref(`/users/${user.uid}/class`).once('value')
    if (!classIdSnapshot.exists()) throw errors.classNotFound()
    if (!(<any>user.customClaims).classAdmin) throw errors.permissionDenied()

    const name = data.name
    const isClosed = data.isClosed
    const pictureUrl = data.photo
    const isInviteVisible = data.isInviteVisible
    const subjects = data.subjects

    const classRef = admin.database().ref(`/classes/${classIdSnapshot.val()}/metadata`)

    if (name) classRef.child('name').set(name).then(() => {
        console.log('Class name updated!')
    }).catch((err) => { throw errors.internal(err) })

    if (isClosed) classRef.child('closed').set(isClosed).then(() => {
        console.log('Closed state updated!')
    }).catch((err) => { throw errors.internal(err) })

    if (pictureUrl) classRef.child('pictureUrl').set(pictureUrl).then(() => {
        console.log('Picture updated!')
    }).catch((err) => {  throw errors.internal(err) })

    if (isInviteVisible) classRef.child('inviteVisible').set(isInviteVisible).then(() => {
        console.log('Invite visibility updated!')
    }).catch((err) => { throw errors.internal(err) })

    if (subjects) classRef.child('subjects').set(subjects).then(() => {
        console.log('Updated subjects!')
    }).catch((err) => { throw errors.internal(err) })
})

exports.getUserInfo = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated()

    const uid = data.uid
    if (!uid) throw errors.noUserId()

    const user = await admin.auth().getUser(uid).catch((err) => {
        throw errors.internal(err)
    })
    if (!user) throw errors.userNotFound()

    const userSnapshot = await admin.database().ref(`/users/${user.uid}`).once('value').catch((err) => {
        throw errors.internal(err)
    })

    return {
        name: user.displayName,
        photo: utils.getUserHQPicture(user),
        className: (await admin.database().ref(`/classes/${userSnapshot.child('class').val()}/metadata/name`).once('value')).val(),
        classRank: (user.customClaims && (<any>user.customClaims).classAdmin) ? 'admin': 'tag',
        facebookId: user.providerData[0].providerId === 'facebook.com' ? user.providerData[0].uid : undefined,
        joinedAt: utils.formatDate(userSnapshot.child('joined').val())
    }
})

exports.getClassPreview = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) throw errors.unauthenticated()

    const code = data.inviteCode
    if (!code) throw errors.noClassNameOrCode()

    const classId = await admin.database().ref(`/classInvites/${code}`).once('value').catch((err) => {
        throw errors.internal(err)
    })
    console.log(classId)
    if (!classId) throw errors.invalidInviteCode()

    const classSnapshot = await admin.database().ref(`/classes/${classId.val()}/metadata`).once('value').catch((err) => {
        throw errors.internal(err)
    })

    console.log({
        name: classSnapshot.child('name').val(),
        photo: classSnapshot.child('pictureUrl').val()
    })

    return {
        name: classSnapshot.child('name').val(),
        photo: classSnapshot.child('pictureUrl').val()
    }
})
// ---------- CLOUD FUNCTION CALLABLES ----------

// ---------- CLOUD FUNCTION TRIGGERS ----------
exports.whenUserCreated = functions.auth.user().onCreate(async (user, context) => {
    return admin.database().ref(`/users/${user.uid}`).set({
        joined: new Date().getTime()
    })
})

exports.whenUserDeleted = functions.auth.user().onDelete(async (user, context) => {
    return admin.database().ref(`/user/${user.uid}`).remove()
})

exports.whenExamAdded = functions.database.ref('/classes/{classId}/exams/{examId}')
    .onCreate((snapshot, context) => {
        const deleteTime = 7/*days*/ * (24 * 3600 * 1000)

        snapshot.ref.parent!.once('value').then((examsSnapshot) => {
            examsSnapshot.forEach((examSnapshot) => {
                const date = Number(examSnapshot.child('date').val())
                const now = new Date().getTime()
        
                console.log(`Testing ${examSnapshot.ref.path}...`)
                if (now - date >= deleteTime) {
                    examSnapshot.ref.remove().then(() => {
                        console.log(`${examSnapshot.ref.path} deleted.`)
                    }).catch((err) => {
                        console.log(`Failed to delete ${examSnapshot.ref.path}. Reason: ${err}`)
                    })
                }
            })
        }).catch((err) => console.log(err))
    })

exports.whenHomeworkAdded = functions.database.ref('/classes/{classId}/homework/{homeworkId}')
    .onCreate((snapshot, context) => {
        const deleteTime = 7/*days*/ * (24 * 3600 * 1000)

        snapshot.ref.parent!.once('value').then((homeworkSnapshot) => {
            homeworkSnapshot.forEach((hwSnapshot) => {
                const date = Number(hwSnapshot.child('date').val())
                const now = new Date().getTime()

                console.log(`Testing ${hwSnapshot.ref.path}...`)
                if (now - date >= deleteTime) {
                    hwSnapshot.ref.remove().then(() => {
                        console.log(`${hwSnapshot.ref.path} deleted.`)
                    }).catch((err) => {
                        console.log(`Failed to delete ${hwSnapshot.ref.path}. Reason: ${err}`)
                    })
                }
            })
        }).catch((err) => console.log(err))
    })
// ---------- CLOUD FUNCTION TRIGGERS ----------