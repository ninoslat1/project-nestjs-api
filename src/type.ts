import { IUser } from "./interface"

export type TUser = IUser & {
    id: number
}

export type TResponseObj = {
    statusCode: number
    timestamp: string
    path: string
    response: string | object
}