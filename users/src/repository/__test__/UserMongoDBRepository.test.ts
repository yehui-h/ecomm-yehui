import { UserMongoDBRepository } from "../User/UserMongoDBRepository"
import { IUser, User } from "../../model/User/UserModel"

describe("User MongoDB Repository cases", () => {
    beforeEach(async () => {
        await User.deleteMany().exec()
    })

    it("should register a new user", async () => {
        // Arrange
        const data = {
            username: "zhen",
            email: "hao.lucky@gmail.com",
            password: "1123243",
            sex: "male",
            age: 20,
            address: "1234",
            avatar: "avatar String"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const _newUser = await mongodbRepo.createUser(
            data.username,
            data.email,
            data.password,
            data.sex,
            data.age,
            data.address,
            data.avatar
        )

        // Assert
        expect(_newUser).toBeDefined()
        expect(_newUser).toHaveProperty("username")
        const newUser = _newUser as IUser
        expect(newUser.username).toBe(data.username)
        expect(newUser.email).toBe(data.email)
        expect(newUser.password).toBe(data.password)
        expect(newUser.sex).toBe(data.sex)
        expect(newUser.age).toBe(data.age)
        expect(newUser.address).toBe(data.address)
        expect(newUser.avatar).toBe(data.avatar)
        expect(newUser.active).toBe(true)
    })

    it("should not register a User with duplicated email", async () => {
        const data = {
            username: "zhen",
            email: "hao.lucky@gmail.com",
            password: "1123243",
            sex: "male",
            age: 20,
            address: "1234",
            avatar: "avatar String"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const newUser1 = await mongodbRepo.createUser(
            data.username,
            data.email,
            data.password,
            data.sex,
            data.age,
            data.address,
            data.avatar
        )
        const newUser2 = await mongodbRepo.createUser(
            data.username,
            data.email,
            data.password,
            data.sex,
            data.age,
            data.address,
            data.avatar
        )

        // Assert
        expect(newUser1).toBeDefined()
        expect(newUser1).toHaveProperty("username")
        expect(newUser2).toBeInstanceOf(Error)
        expect((newUser2 as Error).message).toBe("User already exists")
    })

    it("should update an existing User", async () => {
        // Arrange
        const data1 = {
            username: "aaa",
            email: "aaa@gmail.com",
            password: "123214",
            sex: "male",
            age: 15,
            address: "1234",
            avatar: "avatar String"
        }
        const data2 = {
            username: "bbb",
            email: "bbb@gmail.com",
            password: "2123243",
            sex: "female",
            age: 19,
            avatar: "a avatar String"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const newUser = await mongodbRepo.createUser(
            data1.username,
            data1.email,
            data1.password,
            data1.sex,
            data1.age,
            data1.address,
            data1.avatar
        )
        const id = (newUser as IUser)._id.toString()
        const _updatedUser = await mongodbRepo.updateUser(id, data2)

        // Assert
        expect(_updatedUser).toBeDefined()
        expect(_updatedUser).toHaveProperty("username")
        const updatedUser = _updatedUser as IUser
        expect(updatedUser.username).toBe(data2.username)
        expect(updatedUser.email).toBe(data1.email)
        expect(updatedUser.password).toBe(data2.password)
        expect(updatedUser.sex).toBe(data2.sex)
        expect(updatedUser.age).toBe(data2.age)
        expect(updatedUser.address).toBe(data1.address)
        expect(updatedUser.avatar).toBe(data2.avatar)
    })

    it("should terminate an existing User", async () => {
        // Arrange
        const data = {
            username: "zhen",
            email: "hao.lucky@gmail.com",
            password: "1123243",
            sex: "male",
            age: 20,
            address: "1234",
            avatar: "avatar String"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const newUser = await mongodbRepo.createUser(
            data.username,
            data.email,
            data.password,
            data.sex,
            data.age,
            data.address,
            data.avatar
        )
        const id = (newUser as IUser)._id.toString()
        const terminatedUser = await mongodbRepo.terminateUser(id)

        // Assert
        expect(terminatedUser).toBeDefined()
        expect(terminatedUser).toHaveProperty("username")
        expect((terminatedUser as IUser).active).toBe(false)
    })

    it("should get User details", async () => {
        // Arrange
        const data = {
            username: "zhen",
            email: "hao.lucky@gmail.com",
            password: "1123243",
            sex: "male",
            age: 20,
            address: "1234",
            avatar: "avatar String"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const newUser = await mongodbRepo.createUser(
            data.username,
            data.email,
            data.password,
            data.sex,
            data.age,
            data.address,
            data.avatar
        )
        const email = (newUser as IUser).email
        const _user = await mongodbRepo.getUser(email)

        // Assert
        expect(_user).toBeDefined()
        expect(_user).toHaveProperty("username")
        const user = _user as IUser
        expect(user._id).toBeDefined()
        expect(user.username).toBe(data.username)
        expect(user.email).toBe(data.email)
        expect(user.password).toBe(data.password)
        expect(user.sex).toBe(data.sex)
        expect(user.age).toBe(data.age)
        expect(user.address).toBe(data.address)
        expect(user.avatar).toBe(data.avatar)
        expect(user.active).toBe(true)
    })

    it("should not get User details with non-existing email", async () => {
        // Arrange
        const data = {
            email: "non-existing@gmail.com"
        }

        // Act
        const mongodbRepo = new UserMongoDBRepository()
        const email = data.email
        const user = await mongodbRepo.getUser(email)

        // Assert
        expect(user).toBeInstanceOf(Error)
        expect((user as Error).message).toBe("User not found")
    })
})
