import express, { Router } from "express"
import { UserController } from "../controller/User/UserController"

export class UserRouter {
    private readonly router: Router

    private readonly userController: UserController

    constructor(userController: UserController) {
        this.userController = userController
        this.router = express.Router()
        this.initRoutes()
    }

    private initRoutes(): void {
        // Route for creating a new User
        this.router.post("/signup", this.userController.registerUser)
        // Route for updating a User
        this.router.put("/:uid", this.userController.updateUser)
        // Route for deleting a User
        this.router.put("/terminate", this.userController.terminateUser)
        // Route for getting a User
        this.router.get("/", this.userController.getUser)
    }

    public getRouter(): Router {
        return this.router
    }
}
