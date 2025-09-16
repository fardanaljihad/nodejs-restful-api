import supertest from "supertest";
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-utils.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function() {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Test User');
        expect(result.body.data.username).toBe('test-user');
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Test User');
        expect(result.body.data.username).toBe('test-user');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: '',
                username: '',
                password: ''
            });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if name more than 100 character', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})

describe('POST /api/users/login', function() {
    
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('token');
    })

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test-user',
                password: '123'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})

describe('GET /api/users/current', function() {

    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'token')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Test User');
        expect(result.body.data.username).toBe('test-user');
    })

    it('should can reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'tokentoken')

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})

describe('PATCH /api/users/current', function() {

    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'token')
            .send({
                name: 'Updated User',
                password: 'newpassword'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test-user');
        expect(result.body.data.name).toBe('Updated User');

        const user = await getTestUser();
        expect(await bcrypt.compare('newpassword', user.password)).toBe(true);
    })

    it('should can update name user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'token')
            .send({
                name: 'Updated User',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test-user');
        expect(result.body.data.name).toBe('Updated User');
    })

    it('should can update password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'token')
            .send({
                password: 'newpassword'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test-user');

        const user = await getTestUser();
        expect(await bcrypt.compare('newpassword', user.password)).toBe(true);
    })

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'wrongtoken')
            .send({});

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})
