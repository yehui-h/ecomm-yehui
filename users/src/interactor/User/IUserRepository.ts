import { IUser } from "../../model/User/UserModel"

export interface IUserRepository {
    createUser(
        username: string,
        email: string,
        password: string,
        sex: string,
        age: number,
        address: string,
        avatar: string
    ): Promise<IUser | Error>

    updateUser(id: string, userData: Partial<IUser>): Promise<IUser | Error>

    terminateUser(userId: string): Promise<IUser | Error>

    getUser(email: string): Promise<IUser | Error>
}
