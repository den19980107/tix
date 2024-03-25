export type CreateUser = {
  username: string
  password: string
  phoneNumber: string
  idNumber: string
}

export type UpdateUser = {
  id: number
  phoneNumber: string
  idNumber: string
}

export type User = {
  id: number
  username: string
  password: string
  phoneNumber: string
  idNumber: string
}
