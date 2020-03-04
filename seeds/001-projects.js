
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, 
          "student_id":1,
          "title":"Write Letter of Recommendation",
          "due_date": "06-15-2020",
          "reminder_time":"12:00 PM",
          "notes":"Letter of Recommendation for Harvard"
        
        },
        {id: 2, 
          "student_id":2,
          "title":"Write Letter of Recommendation",
          "due_date": "06-15-2020",
          "reminder_time":"12:00 PM",
          "notes":"Letter of Recommendation for Stanford"
        },
        {id: 3, 
          "student_id":3,
          "title":"Write Letter of Recommendation",
          "due_date": "06-15-2020",
          "reminder_time":"12:00 PM",
          "notes":"Letter of Recommendation for Yale"
        }
      ]);
    });
};
