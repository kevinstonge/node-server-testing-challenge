const db = require('../dbConfig.js');

const getUsers = async () => {
    return await db('users')
}

const getUserByUsername = async (username) => {
    return await db('users').where({username})
}

const createUser = async (userObject) => {
    return await db('users').insert(userObject);
}

const deleteUser = async (username) => {
    return await db('users').where({username}).del()
}

module.exports = { getUsers, getUserByUsername, createUser, deleteUser }