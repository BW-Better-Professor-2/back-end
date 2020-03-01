const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findById,
  findDeadlines,
  findDeadlinesById,
  remove
}

async function add(project) {
  const [id] = await db('Projects').insert(project, 'id');

  return db('Projects')
    .where({ id })
    .first();
}

function find() {
  return db('Projects');
}

function findById(id) {
  return db('Projects')
    .where({ id })
    .first();
}

function findDeadlines(student_id) {
  if (student_id) {
    return db('ProjectsToDeadlines AS ptd')
      .join('Projects AS p', 'p.id', 'ptd.project_id')
      .join('Students&Projects AS s&p', 's&p.project_id', 'p.id')
      .where({ 's&p.student_id': student_id });
  }

  return db('ProjectsToDeadlines');
}

function findDeadlinesById(id) {
  return db('ProjectsToDeadlines AS ptd')
    .where({ 'ptd.project_id': id })
    .select('ptd.deadline_type', 'ptd.deadline');
}

async function remove(id) {
  const project = await findById(id);

  await db('Projects')
    .where({ id })
    .del();

  return project;
}