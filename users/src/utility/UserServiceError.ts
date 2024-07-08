export class UserServiceError extends Error {
    public code: number

    constructor(message: string, code: number) {
        super()
        this.code = code
        this.message = message
    }
}
