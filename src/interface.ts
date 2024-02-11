import { ERole } from "./enum"

export interface IUser {
    name: string
    email: string
    role: ERole
}