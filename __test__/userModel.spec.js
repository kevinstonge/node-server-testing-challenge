const request = require('supertest');
const server = require('../server.js');

describe('GET /api/users should return an array of users', () => {
    it('should return an array of objects', async () => { 
        const result = await request(server).get('/api/users');
        expect(result.body.users).toBe([]);
    })  
})