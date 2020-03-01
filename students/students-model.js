const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findById,
  findProjectsById,
  remove
}

async function add(student) {
  const [id] = await db('Students').insert(student, 'id');

  return db('Students')
    .where({ id })
    .first();
}

function find() {
  return db('Students');
}

function findById(id) {
  return db('Students')
    .where({ id })
    .first();
}

function findProjectsById(id) {
  return db('Projects AS p')
    .join('Students&Projects AS s&p', 's&p.project_id', 'p.id')
    .join('Students AS s', 's.id', 's&p.student_id')
    .where({ 's.id': id })
    .select('p.id', 'p.name');
}

async function remove(id) {
  const student = await findById(id);

  await db('Students')
    .where({ id })
    .del();

  return student;
}