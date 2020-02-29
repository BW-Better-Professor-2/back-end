exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()  
        .unique();
      tbl
      .string('password', 128)
      .notNullable();
    })
    .createTable ('students', tbl => {
        tbl.increments();
        tbl.integer('professor')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.varchar('student_name', 255) 
            .notNullable();
        tbl.varchar('email_address', 255)
            .notNullable()
            .unique();
        tbl.integer(project_id)
            .unsigned();           
     })
     .createTable('projects', tbl => {
         tbl.increments()
         .references('project_id')
         .inTable('students')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');

     })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('students')
    .dropTableIfExists('users');
  };
