// ---------- IMPORTS ----------
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import utils = require('./utils');
// ---------- IMPORTS ----------

// ---------- ADMIN FUNCTIONALITY SETUP ----------
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
// ---------- ADMIN FUNCTIONALITY SETUP ----------

// ---------- CLOUD FUNCTION CALLABLES ----------
exports.joinClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    const user = await admin.auth().getUser(context.auth.uid).catch((err) => {
        throw new functions.https.HttpsError('internal', err);
    });

    // If the user is trying to join an existing class, the inviteCode contains a value,
    // but if the user is trying to create a class, the className holds a value.
    //! One of them is always undefined.
    let className: string = data.name;
    let inviteCode: string = utils.makeDatabasePath(data.inviteCode);

    // These are only defined, if the class is just to be created.
    const classPictureUrl: string = data.photo;
    const classClosed: boolean = data.closed;

    if (className === undefined && inviteCode === undefined) {
        throw new functions.https.HttpsError('invalid-argument', 'No classname or invite code given');
    }

    let classId: string = (await admin.database().ref(`/classInvites/${inviteCode}`).once('value')).val();
    const classSnapshot = await admin.database().ref(`/classes/${classId}`).once('value').catch((err) => {
        throw new functions.https.HttpsError('internal', err);
    });;

    if (!classSnapshot.exists()) {
        const classRef = admin.database().ref('/classes').push();
        classId = String(classRef.key);
        inviteCode = utils.generateInviteCode();

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
            throw new functions.https.HttpsError('unknown', err);
        });

        admin.database().ref(`/classInvites/${inviteCode}`).set(classId).catch((err) => {
            throw new functions.https.HttpsError('unknown', err);
        });
    } else {
        if (user.customClaims !== undefined && (<any>user.customClaims).class === classId) {
            throw new functions.https.HttpsError('already-exists', 'User is already a member in the class');
        }

        className = classSnapshot.child('metadata/name').val();

        const memberIndex = classSnapshot.child('members').numChildren();
        admin.database().ref(classSnapshot.child(`members/${memberIndex}`).ref).set(context.auth.uid).catch((err) => {
            throw new functions.https.HttpsError('unknown', err);
        });
    }

    admin.auth().setCustomUserClaims(context.auth.uid, {
        class: classId,
        className: className,
        classAdmin: !(classSnapshot.exists())
    }).catch((err) => {
        throw new functions.https.HttpsError('unknown', err);
    });

    return {classId: classId};
});

exports.leaveClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    const user = await admin.auth().getUser(context.auth.uid).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
    const isAdmin = (<any>user.customClaims).classAdmin;
    const classId = (<any>user.customClaims).class;
    if (classId === undefined) {
        throw new functions.https.HttpsError('failed-precondition', 'User has no class');
    }

    console.log(`Leaving class with id ${classId}`);

    const classSnapshot = await admin.database().ref(`/classes/${classId}`).once('value').catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });

    if (isAdmin) {
        classSnapshot.child(`members`).forEach((memberSnapshot) => {
            const memberId = memberSnapshot.val();
            console.log(`Removing claims of user with id ${memberId}`);
            admin.auth().setCustomUserClaims(memberId, {}).catch((error) => {
                throw new functions.https.HttpsError('unknown', error);
            });
        });

        classSnapshot.ref.remove().catch((error) => {
            throw new functions.https.HttpsError('unknown', error);
        });

        admin.database().ref(`/classInvites`).orderByValue().equalTo(classId).ref.remove().catch((error) => {
            throw new functions.https.HttpsError('unknown', error);
        });
    } else {
        admin.auth().setCustomUserClaims(user.uid, {}).catch((error) => {
            throw new functions.https.HttpsError('unknown', error);
        });

        classSnapshot.child('members/').ref.once('value').then((snapshot) => {
            snapshot.forEach((child) => {
                if (child.val() === user.uid) {
                    child.ref.remove().catch((error) => {
                        throw new functions.https.HttpsError('unknown', error);
                    });
                }
            });
        }).catch((error) => {
            throw new functions.https.HttpsError('unknown', error);
        });
    }

    return {classId: classId};
});

// TODO: Delete class function

exports.addSubjectToClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }
    const user = await admin.auth().getUser(context.auth.uid).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
    if (!(<any>user.customClaims) || !(<any>user.customClaims).class) {
        throw new functions.https.HttpsError('not-found', 'No user class found');
    }
    if (!(<any>user.customClaims).classAdmin) {
        throw new functions.https.HttpsError('permission-denied', 'User cannot add subjects to this class');
    }

    const subjectName: string = data.name;
    if (subjectName === undefined || subjectName === '') {
        throw new functions.https.HttpsError('invalid-argument', 'No subject name given');
    }

    await admin.database().ref(`/classes/${(<any>user.customClaims).class}/metadata/subjects`).push(subjectName).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
});

exports.addContentToClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }
    const user = await admin.auth().getUser(context.auth.uid).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
    if (!(<any>user.customClaims) || !(<any>user.customClaims).class) {
        throw new functions.https.HttpsError('not-found', 'No user class found');
    }

    const type = data.typeOf;
    const content = data.content;
    if (type === undefined || type === '' || content === undefined) {
        throw new functions.https.HttpsError('invalid-argument', 'No content or content type was given');
    }
    if (type !== 'homework' && type !== 'exams') {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid content type given');
    }
    if (!(content.title) || !(content.subject) || !(content.date)) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing parts of content');
    }

    content.createdAt = new Date().getTime();
    content.creator = user.uid;

    console.log(content);

    await admin.database().ref(`/classes/${(<any>user.customClaims).class}/${type}`).push(content).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
});

exports.updateClass = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }
    const user = await admin.auth().getUser(context.auth.uid).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
    if (!(<any>user.customClaims) || !(<any>user.customClaims).class) {
        throw new functions.https.HttpsError('not-found', 'No user class found');
    }
    if (!(<any>user.customClaims).classAdmin) {
        throw new functions.https.HttpsError('permission-denied', 'User cannot add subjects to this class');
    }

    const name = data.name;
    const isClosed = data.isClosed;
    const pictureUrl = data.photo;
    const isInviteVisible = data.isInviteVisible;
    const subjects = data.subjects;

    const classRef = admin.database().ref(`/classes/${(<any>user.customClaims).class}/metadata`);

    if (name) classRef.child('name').set(name).then(() => {
        console.log('Class name updated!');
        classRef.parent!.child('members').once('value').then((membersSnapshot) => {
            membersSnapshot.forEach((member) => {
                admin.auth().getUser(member.val()).then((memberUser) => {
                    const newClaims = memberUser.customClaims!;
                    (<any>newClaims).className = name;
                    admin.auth().setCustomUserClaims(memberUser.uid, newClaims).then(() => {
                        console.log(`Updated custom claims for user: ${memberUser.displayName}`);
                    }).catch((error) => {
                        throw new functions.https.HttpsError('unknown', error);
                    });
                }).catch((error) => {
                    throw new functions.https.HttpsError('unknown', error);
                });
            });
        }).catch((error) => {
            throw new functions.https.HttpsError('unknown', error);
        });
    }).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });

    if (isClosed) classRef.child('closed').set(isClosed).then(() => {
        console.log('Closed state updated!');
    }).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });

    if (pictureUrl) classRef.child('pictureUrl').set(pictureUrl).then(() => {
        console.log('Picture updated!');
    }).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });

    if (isInviteVisible) classRef.child('inviteVisible').set(isInviteVisible).then(() => {
        console.log('Invite visibility updated!');
    }).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });

    if (subjects) classRef.child('subjects').set(subjects).then(() => {
        console.log('Updated subjects!');
    }).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    })
});

exports.getUserInfo = functions.https.onCall(async (data, context) => {
    if (context.auth === undefined) {
        throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    const uid = data.uid;
    if (!uid) {
        throw new functions.https.HttpsError('invalid-argument', 'No user id was provided');
    }

    const user = await admin.auth().getUser(uid).catch((error) => {
        throw new functions.https.HttpsError('unknown', error);
    });
    if (!user) {
        throw new functions.https.HttpsError('not-found', 'No user found with given id');
    }

    const joinedSnapshot = await admin.database().ref(`/users/${user.uid}/joined`).once('value').catch((err) => {
        throw new functions.https.HttpsError('internal', err);
    });

    return {
        name: user.displayName,
        photo: utils.getUserHQPicture(user),
        className: user.customClaims ? (<any>user.customClaims).className : undefined,
        classRank: user.customClaims? ((<any>user.customClaims).classAdmin ? 'admin' : 'tag') : undefined,
        facebookId: user.providerData[0].providerId === 'facebook.com' ? user.providerData[0].uid : undefined,
        joinedAt: utils.formatDate(joinedSnapshot.val())
    }
});
// ---------- CLOUD FUNCTION CALLABLES ----------

// ---------- CLOUD FUNCTION TRIGGERS ----------
exports.whenUserCreated = functions.auth.user().onCreate(async (user, context) => {
    return admin.database().ref(`/users/${user.uid}`).set({
        joined: new Date().getTime()
    });
});

exports.whenUserDeleted = functions.auth.user().onDelete(async (user, context) => {
    return admin.database().ref(`/user/${user.uid}`).remove();
});

exports.whenExamAdded = functions.database.ref('/classes/{classId}/exams/{examId}').onCreate((snapshot, context) => {
    const deleteTime = 30/*days*/ * (24 * 3600 * 1000);

    snapshot.ref.parent!.once('value').then((examsSnapshot) => {
        examsSnapshot.forEach((examSnapshot) => {
            const date = Number(examSnapshot.child('date').val());
            const now = new Date().getTime();
    
            console.log(`Testing ${examSnapshot.ref.path}...`);
            if (now - date >= deleteTime) {
                examSnapshot.ref.remove().then(() => {
                    console.log(`${examSnapshot.ref.path} deleted.`);
                }).catch((err) => {
                    console.log(`Failed to delete ${examSnapshot.ref.path}. Reason: ${err}`);
                });
            }
        });
    }).catch((err) => console.log(err));
});

exports.whenHomeworkAdded = functions.database.ref('/classes/{classId}/homework/{homeworkId}').onCreate((snapshot, context) => {
    const deleteTime = 30/*days*/ * (24 * 3600 * 1000);

    snapshot.ref.parent!.once('value').then((homeworkSnapshot) => {
        homeworkSnapshot.forEach((hwSnapshot) => {
            const date = Number(hwSnapshot.child('date').val());
            const now = new Date().getTime();

            console.log(`Testing ${hwSnapshot.ref.path}...`);
            if (now - date >= deleteTime) {
                hwSnapshot.ref.remove().then(() => {
                    console.log(`${hwSnapshot.ref.path} deleted.`);
                }).catch((err) => {
                    console.log(`Failed to delete ${hwSnapshot.ref.path}. Reason: ${err}`);
                });
            }
        });
    }).catch((err) => console.log(err));
});
// ---------- CLOUD FUNCTION TRIGGERS ----------