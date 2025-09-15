import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test-user'
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            name: 'Test User',
            username: 'test-user',
            password: await bcrypt.hash('password', 10),
            token: 'token',
        }
    })
}
