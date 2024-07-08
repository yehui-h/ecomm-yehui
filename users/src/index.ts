import { MongoDBUtil } from "./utility/dbConnection"
import { EnvLoader } from "./utility/env/envLoader"
import { startServer } from "./utility/server/server"

if (require.main == module) {
    const variables = EnvLoader.instance().variables
    console.log("loaded env variables", variables)

    const dbHostname = variables.DB_HOSTNAME as string
    const dbName = variables.USER_DB_NAME as string
    const db = new MongoDBUtil(dbName, dbHostname)
    db.connect()
        .then(() => {
            console.log("MongoDB is UP!!")
        })
        .catch(() => console.log("Failed to connect MongoDB."))

    const port = (variables.HTTP_PORT ?? 8081) as number
    startServer(port)
}
