import { MongoDBUtil } from "../dbConnection"
import { EnvLoader } from "../env/envLoader"
import { startServer, stopServer } from "../server/server"

const variables = EnvLoader.instance().variables
const dbName = variables.USER_DB_NAME as string
const dbHostname = variables.DB_HOSTNAME as string
const port = (variables.HTTP_PORT || 8081) as number
const mongoDB = new MongoDBUtil(dbName, dbHostname)

//Read this first to save your life: https://mongoosejs.com/docs/jest.html#globalsetup-and-globalteardown
beforeAll(async () => {
    await mongoDB.connect()
    await new Promise<void>((resolve) => {
        startServer(port, resolve)
    })
})

afterAll(async () => {
    await new Promise<void>((resolve) => {
        setTimeout(async () => {
            await mongoDB.disconnect()
            resolve()
        }, 3 * 1000)
    })

    await new Promise<void>((resolve) => {
        stopServer(resolve)
    })
})
