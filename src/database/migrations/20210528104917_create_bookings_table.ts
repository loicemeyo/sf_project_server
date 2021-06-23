import * as Knex from "knex";
import { bookingsTable } from "../constants";

const createBookingsTable = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(bookingsTable, (table) => {
    table.increments("id").primary();
    table.string("house_name").notNullable();
    table.string("user_email").notNullable();
    table.string("admin_email").nullable();
    table.string("status").notNullable().defaultTo("pending");
    table.date("from").notNullable();
    table.date("to").notNullable();
  });
};

export async function up(knex: Knex): Promise<void> {
  await createBookingsTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(bookingsTable);
}
