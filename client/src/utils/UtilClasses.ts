export class ClientInfo {
  name!: string
  photo!: string
  classId!: string
  className!: string
  classRank!: string
  facebookId!: string | undefined
  joined!: string
}

export class ClassInfo {
  name!: string
  photo!: string
  subjects!: string[]
}

export class ClassContentInfo {
  createdAt!: number
  creator!: string
  date!: number
  subject!: string
  title!: string
}

export class UserInfo {
  name!: string
  photo!: string
  className!: string
  classRank!: string
  facebookId!: string | undefined
  joinedAt!: string
}