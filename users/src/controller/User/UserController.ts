import { IUserRegisterUseCase } from "./IUserRegisterUseCase"
import { Request, Response } from "express"

export class UserController {
    private userRegisterUseCase: IUserRegisterUseCase

    constructor(userRegister: IUserRegisterUseCase) {
        // dependency inject - inject the User register User
        this.userRegisterUseCase = userRegister
    }

    registerUser = async (req: Request, res: Response) => {
        const { username, email, password, sex, age, address, avatar } = req.body
        const result = await this.userRegisterUseCase.registerUser(username, email, password, sex, age, address, avatar)
        if (result instanceof Error) {
            console.log("result = ", result)
            res.status(400).send(result.message)
            console.log("result1 = ", result.message)
        } else {
            res.status(200).send(result)
        }
    }

    updateUser = async (req: Request, res: Response) => {
        const { uid } = req.params
        if (uid === undefined) {
            res.status(400).send("uid is required")
        }

        const userData = req.body
        delete userData.email
        const result = await this.userRegisterUseCase.updateUser(uid, userData)
        if (result instanceof Error) {
            res.status(400).send(result.message)
        } else {
            res.status(200).send(result)
        }
    }

    terminateUser = async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await this.userRegisterUseCase.terminateUser(id)
        if (result instanceof Error) {
            res.status(400).send(result.message)
        } else {
            res.status(200).send(result)
        }
    }

    getUser = async (req: Request, res: Response) => {
        const { email } = req.params
        const result = await this.userRegisterUseCase.getUser(email)
        if (result instanceof Error) {
            res.status(400).send(result.message)
        } else {
            res.status(200).send(result)
        }
    }
}
