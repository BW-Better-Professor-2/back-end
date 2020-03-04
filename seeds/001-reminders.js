
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reminders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {
          id: 1, 
          "message":"Don't forget final is at 8:00AM",
          "time_stamp":"2020-03-03 12:00PM",
          "user_id":1
        },
        {
          id: 2, 
          "message":"Don't forget to turn in final",
          "time_stamp":"2020-03-03 12:01PM",
          "user_id":1
        },
      ]);
    });
};
