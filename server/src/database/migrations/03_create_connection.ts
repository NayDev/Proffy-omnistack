import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id') //Tabela de Relacionamento
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); //Exclui todas as aulas do prof caso ele seja excluido
        
        table.timestamp('created_at') 
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))   //pega o horario atual
            .notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}