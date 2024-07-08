import { IUserRepository } from "./IUserRepository"
import { IUserRegisterUseCase } from "../../controller/User/IUserRegisterUseCase"
import { IUser } from "../../model/User/UserModel"

export class UserInteractor implements IUserRegisterUseCase {
    // dependency injection - inject the repository instance
    private userRepository: IUserRepository

    constructor(dbRepository: IUserRepository) {
        this.userRepository = dbRepository
    }

    async registerUser(
        username: string,
        email: string,
        password: string,
        sex: string,
        age: number,
        address: string,
        avatar: string
    ): Promise<IUser | Error> {
        return await this.userRepository.createUser(username, email, password, sex, age, address, avatar)
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | Error> {
        return await this.userRepository.updateUser(id, userData)
    }

    async terminateUser(userId: string): Promise<IUser | Error> {
        return await this.userRepository.terminateUser(userId)
    }

    async getUser(email: string): Promise<IUser | Error> {
        return await this.userRepository.getUser(email)
    }
}
