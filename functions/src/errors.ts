import * as functions from 'firebase-functions'

const errors = {
  internal: (err: any) => new functions.https.HttpsError('internal', err),
  unauthenticated: () => new functions.https.HttpsError('unauthenticated', 'Ehhez be kell jelentkezni.'),
  alreadyInClass: () => new functions.https.HttpsError('already-exists', 'Már tartozol egy osztályhoz'),
  noClassNameOrCode: () => new functions.https.HttpsError('invalid-argument', 'Nincs meghívókód vagy osztálynév.'),
  invalidInviteCode: () => new functions.https.HttpsError('invalid-argument', 'Érvénytelen meghívókód.'),
  classNotFound: () => new functions.https.HttpsError('not-found', 'Nem vagy osztályhoz csatlakozva.'),
  permissionDenied: () => new functions.https.HttpsError('permission-denied', 'Nincs jogod ehhez.'),
  noSubject: () => new functions.https.HttpsError('invalid-argument', 'Nem adtál meg tanárgyat.'),
  noContent: () => new functions.https.HttpsError('invalid-argument', 'Nem adtál meg semmilyen tartalmat.'),
  invalidContentType: () => new functions.https.HttpsError('invalid-argument', 'Érvéntelen tartalmi típus.'),
  noUserId: () => new functions.https.HttpsError('invalid-argument', 'Nem adtál meg felhasználói azonosítót.'),
  userNotFound: () => new functions.https.HttpsError('not-found', 'Felhaszáló nem található.'),
}

export default errors