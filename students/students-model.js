const db = require('../data/dbConfig');

module.exports = {
    getStudents,
    findStudentById,
    addStudent,
    updateStudent,
    removeStudent,
    getProjectList

}

function getStudents() {
    return db.select("*").from('students')
}

function findStudentById(id) {
    return db('students')
    .where({id})
    .first()
}

function addStudent(newStudent){
    return db('students')
    .insert(newStudent)
    .then(ids => {
        const [id] = ids
        return findStudentById(id)
    })
}

function updateStudent(changes, id){
    return db('students')
    .where('id', id)
    .update(changes)
    .then(updated => {
        updated > 0 ? findStudentById(id) : null
    })
}

function removeStudent (id) {
    return db('students')
    .where('id', id)
    .del()
    
}

function getProjectList(id) {
    
    return db('projects as p')
    .join('students as s', 'p.student_id', 's.id')
    .select('p.id as projectId', 'p.title', 'p.due_date', 'p.reminder_time', 'p.notes')
    .where({'student_id' : id})
    .then(projects => {
        if (projects) {
            return projects
            
        } else {
            return null
        }
    })   
}

