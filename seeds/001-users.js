
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 
          "username":"professordoofenshmirtz",
          "password":"12345"
        },
        {id: 2, 
          "username":"richardm",
          "password":"12345"
        },
        {id: 3, 
          "username":"richard",
          "password":"12345"
        }
      ]);
    });
};
