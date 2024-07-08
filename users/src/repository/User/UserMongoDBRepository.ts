import { IUserRepository } from "../../interactor/User/IUserRepository"
import { IUser, User } from "../../model/User/UserModel"
import { MongoServerError } from "mongodb"
import { UserServiceError } from "../../utility/UserServiceError"
import { UserError } from "../../utility/ErrorCode/ErrorCode"

export class UserMongoDBRepository implements IUserRepository {
    async createUser(
        username: string,
        email: string,
        password: string,
        sex: string,
        age: number,
        address: string,
        avatar: string
    ): Promise<IUser | Error> {
        try {
            const newUser = new User({
                username,
                email,
                password,
                sex,
                age,
                address,
                avatar
            })
            const data = await newUser.save()
            return data.toObject()
        } catch (e: unknown) {
            console.log("createUser failed. err=", JSON.stringify(e))
            if (e instanceof MongoServerError && e.code === 11000) {
                console.log(e, typeof e)
                return new UserServiceError("User already exists", UserError.USER_ALREADY_EXISTS)
            }
            return new UserServiceError("Unknown error", UserError.UNKNOWN_ERROR)
        }
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | UserServiceError> {
        try {
            const updateData = userData
            delete updateData.email
            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })
            if (!updatedUser) {
                return new UserServiceError("User not found", UserError.USER_NOT_FOUND)
            }
            return updatedUser
        } catch (e: unknown) {
            console.log("updateUser failed. err=", JSON.stringify(e))
            return new UserServiceError("Unknown error", UserError.UNKNOWN_ERROR)
        }
    }

    async terminateUser(userId: string): Promise<IUser | UserServiceError> {
        try {
            const terminatedUser = await User.findByIdAndUpdate(userId, { active: false }, { new: true })
            if (!terminatedUser) {
                return new UserServiceError("User not found", UserError.USER_NOT_FOUND)
            }
            return terminatedUser
        } catch (e: unknown) {
            console.log("terminateUser failed. err=", JSON.stringify(e))
            return new UserServiceError("Unknown error", UserError.UNKNOWN_ERROR)
        }
    }

    async getUser(email: string): Promise<IUser | UserServiceError> {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return new UserServiceError("User not found", UserError.USER_NOT_FOUND)
            }
            return user
        } catch (e: unknown) {
            console.log("getUser failed. err=", JSON.stringify(e))
            return new UserServiceError("Unknown error", UserError.UNKNOWN_ERROR)
        }
    }
}
