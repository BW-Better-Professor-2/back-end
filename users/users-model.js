const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    findUserById,
    updateUser,
    removeUser,
    getStudentList

}

function getUsers() {
    return db.select("*").from('users')
}

function findUserById(id) {
    return db('users')
    .where({id})
    .first()
}

function updateUser(changes, id){
    return db('users')
    .where({id})
    .update(changes)
    .then(count=> {
        if (count > 0) {
            return findUserById(id)
        } else {
            return null;
        }
    })
}

function removeUser (id) {
    return db('users')
    .where('id', id)
    .del()
    
}

function getStudentList(id) {
    
    return db('students as s')
    .join('users as u', 's.professor_id', 'u.id')
    .select('s.id as studentId', 's.name', 's.email', 's.image_url')
    .where({'professor_id' : id})
    .then(students => {
        if (students) {
            return students
            
        } else {
            return null
        }
    })   
}