// const db = require('../data/dbConfig');

// module.exports = {
//   find,
//   findById,
//   findByUserId,
//   findByStudentId,
//   findBySelf,
//   add,
//   remove
// }

// function find() {
//   return db('Messages');
// }

// function findById(id) {
//   return db('Messages')
//     .where({ id })
//     .first();
// }

// function findByUserId(user_id) {
//   return db('Messages')
//     .where({ user_id })
//     .select(
//       'id',
//       'student_id',
//       'text',
//       'send_to_self',
//       'timestamp'
//     );
// }

// function findByStudentId(student_id) {
//   return db('Messages')
//     .where({ student_id })
//     .select(
//       'id AS message_id',
//       'text',
//       'send_to_self',
//       'timestamp'
//     );
// }

// function findBySelf(user_id) {
//    return db('Messages')
//     .where({ 'send_to_self': 1, user_id })
//     .select(
//       'id AS message_id',
//       'student_id',
//       'text',
//       'timestamp'
//     );
// }

// async function add(message) {
//   const timestamp = JSON.stringify(new Date());
//   const [id] = await db('Messages').insert({ ...message, timestamp }, 'id');

//   return db('Messages')
//     .where({ id })
//     .first();
// }

// async function remove(id) {
//   const message = await findById(id);

//   await db('Messages')
//     .where({ id })
//     .del();

//   return message;
// }

const db = require("../data/dbConfig");

module.exports = {
  addMessage,
  findMessages,
  findById,
};

function findMessages() {
  return db
    .select({ student_name: "name" }, "text", "time_stamp")
    .from("messages")
    .join("students", "messages.student_id", "=", "students.id");
}

async function addMessage(message) {
  const [id] = await db("messages").insert(message, "id");

  return findById(id);
}

function findById(id) {
  return db("messages")
    .where({ id })
    .first();
}
