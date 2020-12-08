
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.text('username',32).notNull();
        users.text('email',64).notNull();
        users.text('hash',128).notNull();
        users.unique('username');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
