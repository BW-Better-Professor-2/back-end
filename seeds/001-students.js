
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, 
          "professor_id":1,
          "name":"Billy Madison",
          "email":"billymadison@yahoo.com"
        },
        {id: 2, 
          "professor_id":2,
          "name":"Ferris Bueller",
          "email":"saveferris@aol.com"
        },
       
      ]);
    });
};
