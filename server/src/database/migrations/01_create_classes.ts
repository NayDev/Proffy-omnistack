import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id') //Tabela de Relacionamento
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); //Exclui todas as materias do prof caso ele seja excluido
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}