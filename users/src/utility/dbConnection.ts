import { connect, Mongoose } from "mongoose"

export class MongoDBUtil {
    private readonly database: string

    private readonly host: string

    private mongoose: Mongoose | undefined

    constructor(database: string, host: string) {
        this.host = host
        this.database = database
    }

    connect = async () => {
        try {
            const mongoURI: string = `mongodb://${this.host}:27017/${this.database}`
            this.mongoose = await connect(mongoURI)

            this.mongoose.connection.on("error", (err) => {
                if (err) {
                    console.log("Database connection is wrong. err=", err)
                }
            })
            this.mongoose.connection.on("open", () => console.log("Database open"))
            this.mongoose.connection.on("connected", () => console.log("Database connected"))
            this.mongoose.connection.on("disconnected", () => console.log("Database disconnected"))
            this.mongoose.connection.on("reconnected", () => console.log("Database reconnected"))
            this.mongoose.connection.on("disconnecting", () => console.log("Database disconnecting"))
            this.mongoose.connection.on("close", () => console.log("Database close"))
        } catch (e) {
            console.error("connect mongodb failed. err=", e)
            throw e
        }
    }

    disconnect = async () => {
        await this.mongoose?.disconnect()
    }
}
