import express, { Express } from "express"
import http from "http"
import { UserMongoDBRepository } from "../../repository/User/UserMongoDBRepository"
import { UserInteractor } from "../../interactor/User/UserInteractor"
import { UserController } from "../../controller/User/UserController"
import { UserRouter } from "../../router/UserRouter"

// initialise the express library
const app: Express = express()

// enable parse json style http body
app.use(express.json())

// init router
const dbRepository = new UserMongoDBRepository()
const userInteractor = new UserInteractor(dbRepository)
const controller = new UserController(userInteractor)
const usersRouter = new UserRouter(controller)
app.use("/user", usersRouter.getRouter())

let server: http.Server

export function startServer(port: number, cb?: () => void) {
    server = app.listen(port, () => {
        console.log(`ecomm-catalog server is up on port ${port} !!!!`)
        if (cb) cb()
    })
}

export function stopServer(cb?: () => void) {
    server.unref()
    server.close()
    if (cb) cb()
}

export default app
