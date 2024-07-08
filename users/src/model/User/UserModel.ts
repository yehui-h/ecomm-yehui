import { Document, model, Schema } from "mongoose"

// Define the TypeScript interface for the User document
export interface IUser extends Document {
    _id: Schema.Types.ObjectId
    username: string
    email: string
    password: string
    sex: string
    age: number
    address: string
    avatar: string
    active: boolean
    createdAt: Schema.Types.Date
    updatedAt: Schema.Types.Date
}

// Define the User model class
class UserModel {
    private readonly _model

    static instance: UserModel

    private constructor() {
        const UserSchema = new Schema<IUser>(
            {
                username: { type: String, required: true },
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                sex: { type: String, required: true },
                age: { type: Number, required: true },
                address: { type: String, required: true },
                avatar: { type: String, required: true },
                active: { type: Boolean, default: true }
            },
            { timestamps: true }
        )

        UserSchema.index({ email: 1 }, { unique: true })

        // Create and export the User model
        this._model = model<IUser>("User", UserSchema)

        this._model.on("index", (err) => {
            if (err) {
                console.error("index creations failed. err=", err)
            }
        })
    }

    public static getInstance = (): UserModel => {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel()
        }
        return UserModel.instance
    }

    // Getter method to access the User model
    get model() {
        return this._model
    }
}

// Export an instance of the UserModel class
export const User = UserModel.getInstance().model
