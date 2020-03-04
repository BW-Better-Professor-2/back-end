

const db = require("../data/dbConfig");

module.exports = {
  addReminder,
  findReminders,
  findById,
  updateReminder,
  deleteReminder,
};

function findReminders() {
  return db.select("*")
  .from('reminders')
}

async function addReminder(reminder) {
  const [id] = await db("reminders")
  .insert(reminder, "id");

  return findById(id);
}

function findById(id) {
  return db("reminders")
    .where({ id })
    .first();
}

function updateReminder(changes, id){
  return db('reminders')
    .where('id', id)
    .update(changes)
    .then(updated => {
      updated > 0 ? findById(id) : null
  })
}

function deleteReminder(id){
  return db('reminders')
  .where('id', id)
  .del()


}