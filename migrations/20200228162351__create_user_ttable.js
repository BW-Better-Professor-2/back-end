exports.up = function(knex) {
    return knex.schema
      .createTable('Users', table => {
        table.increments();
        table.string('username', 128)
          .notNullable()
          .unique();
        table.string('password', 128)
          .notNullable();
      })
      .createTable('Students', table => {
        table.increments();
        table.string('name', 128)
          .notNullable();
      })
      .createTable('Projects', table => {
        table.increments();
        table.string('name', 128)
          .notNullable();
      })
      .createTable('Users&Students', table => {
        table.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Users');
        table.integer('student_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Students');
        table.primary(['user_id', 'student_id']);
      })
      .createTable('Students&Projects', table => {
        table.integer('student_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Students');
        table.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Projects');
        table.primary(['student_id', 'project_id']);
      })
      .createTable('ProjectsToDeadlines', table => {
        table.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Projects');
        table.string('deadline_type', 128)
          .notNullable();
        table.string('deadline', 128)
          .notNullable();
      })
      .createTable('Messages', table => {
        table.increments();
        table.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id').inTable('Users');
        table.integer('student_id')
          .unsigned()
          .references('id').inTable('Students');
        table.string('text', 1024)
          .notNullable();
        table.boolean('send_to_self')
          .notNullable()
          .defaultTo(false);
        table.string('timestamp', 128)
          .notNullable();
      })
  
  };

  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('Messages')
      .dropTableIfExists('ProjectsToDeadlines')
      .dropTableIfExists('Students&Projects')
      .dropTableIfExists('Users&Students')
      .dropTableIfExists('Projects')
      .dropTableIfExists('Students')
      .dropTableIfExists('Users');
  };
  