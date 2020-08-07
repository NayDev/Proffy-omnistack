import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id') //Tabela de Relacionamento
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); //Exclui todas as aulas do prof caso ele seja excluido
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}