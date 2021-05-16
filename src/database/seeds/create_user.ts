import * as Knex from "knex";
import { userAccountsTable } from "../constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userAccountsTable).del();

  // Inserts seed entries
  await knex(userAccountsTable).insert([
    { phone: "phone1", email: "email1@mail.com", password: "password1", role: "admin", is_verified: true },
    { phone: "phone2", email: "email2@mail.com", password: "password1", role: "user", is_verified: false  },
    { phone: "phone3", email: "email3@mail.com", password: "password1", role: "user", is_verified: false },
    { phone: "phone4", email: "email4@mail.com", password: "password1", role: "user", is_verified: false },
  ]);
}
