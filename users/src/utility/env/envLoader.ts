import * as process from "node:process"
import dotenv from "dotenv"
import path from "path"

enum AllowedKeys {
    NODE_ENV = "NODE_ENV",
    HTTP_PORT = "HTTP_PORT",
    DB_HOSTNAME = "DB_HOSTNAME",
    USER_DB_NAME = "USER_DB_NAME"
}

type ENV_VARIABLE = { [key in AllowedKeys]: string }

export class EnvLoader {
    private static readonly _instance: EnvLoader

    private static _variables: Partial<ENV_VARIABLE> = { NODE_ENV: "test" }

    private constructor() {
        if (process.env.NODE_ENV !== "test") {
            const _path = path.join(__dirname, "../../../env/.env.jest")
            dotenv.config({ path: _path })
        }
        Object.entries(process.env).forEach(([key, value]) => {
            if (this.isKeyAllowed(key) && value) {
                EnvLoader._variables[key] = value
            }
        })
    }

    static instance(): EnvLoader {
        if (!this._instance) {
            return new EnvLoader()
        }
        return this._instance
    }

    private isKeyAllowed(key: string): key is AllowedKeys {
        return Object.keys(AllowedKeys).includes(key)
    }

    public get variables(): Partial<ENV_VARIABLE> {
        return EnvLoader._variables
    }
}
