const request = require('supertest');
const dbConfig = require('../data/dbConfig.js');
const server = require('../server.js');
const db = require('../data/dbConfig.js')
beforeAll(async () => {
    return await db('users').truncate();
});
describe('GET /api/users on empty database', () => {
    it('should return an empty array if no users have been added to the database', async () => {
        const result = await request(server).get('/api/users');
        expect(result.body.users).toEqual([]);
    });
});

describe('POST /api/users', () => {
    it('given proper input, should return newUserID', async () => {
        const newUserObject = { username: "test1", email: "test1@gmail.com", password: "password" };
        const result = await request(server).post('/api/users').send(newUserObject);
        expect(result.body.newUserId).toEqual([1]);
    });
    it('given bad input, should return an error message', async () => {
        const newUserObject = { username: "", email: "asdf@gmail.com", password: "password" }
        const result = await request(server).post('/api/users').send(newUserObject);
        expect(result.body).toEqual({"message": "please provide a username"});
    })
})

describe('GET /api/users should return an array of users', () => {
    it('should return an array of users in the users table, with the first username matching what was sent via the previous post request', async () => {
        const result = await request(server).get('/api/users');
        expect(result.body.users[0].username).toEqual('test1');
    })
});

describe('DELETE /api/users', () => {
    it('should fail to delete the user if the incorrect password is given', async () => {
        const result = await request(server).delete('/api/users').send({ username: "test1", password: "incorrect" });
        expect(result.body.message).toEqual("incorrect password provided, you are not authorized to delete that user");
    });
    it('should successfully delete the user if the correct password is given', async () => {
        const result = await request(server).delete('/api/users').send({ username: "test1", password: "password" });
        expect(result.body.message).toEqual("successfully deleted username: test1");
    })
})

describe('GET /api/users on empty database', () => {
    it('should return an empty array after the only user in the database has been deleted', async () => {
        const result = await request(server).get('/api/users');
        expect(result.body.users).toEqual([]);
    });
});