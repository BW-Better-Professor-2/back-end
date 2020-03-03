const db = require('../data/dbConfig')

module.exports = {
    addUser,
    findBy,
    getUsers,

}

function addUser(credentials){
    return db('users')
    .insert(credentials)
    
}

function findBy(filter){
    return db('users')
    .where(filter).first()
}

function getUsers(){
    return db('users')
}