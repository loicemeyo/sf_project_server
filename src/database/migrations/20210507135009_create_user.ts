import * as Knex from "knex";
import { userAccountsTable } from "../constants";

const createUserAccountsTable = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(userAccountsTable, (table) => {
    table.increments("id").primary();
    table.string("phone").nullable();
    table.string("email").nullable().unique();
    table.string("password").notNullable();
    table.string("role").nullable().defaultTo('user');
    table.string("is_authenticated").defaultTo('false');
  });
};

export async function up(knex: Knex): Promise<void> {
  await createUserAccountsTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userAccountsTable);
}

