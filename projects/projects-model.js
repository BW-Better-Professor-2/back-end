const db = require('../data/dbConfig')


module.exports = {
    findProjects,
    findById,
    addProject,
    updateProject,
    deleteProject,
}

function findProjects() {
    return db.select('*')
    .from('projects')
}

function findById (id) {
    return db('projects')
    .where({id})
    .first()
}

function addProject(newProjects){
    return db('projects')
    .insert(newProjects)
    .then(ids => {
        const [id] = ids
        return findById(id)
    })
}

function updateProject(changes, id){
    return db('projects')
    .where('id', id)
    .update(changes)
    .then(updated => {
        updated > 0 ? findById(id) : null
    })
}

function deleteProject(id){
    return db('projects')
    .where('id', id)
    .del()


}