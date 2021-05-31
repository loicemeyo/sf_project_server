import * as Knex from "knex";
import bcrypt from "bcrypt";
import { userAccountsTable } from "../constants";
import {getConfig} from '../../config';

const { 
  seedsData: {
    user1Email, 
    user2Email, 
    user1Password, 
    user2Password
  }} = getConfig();

const salt = bcrypt.genSaltSync(10); 

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userAccountsTable).del();

  //hash passwords
  const hashedUser1Password = await bcrypt.hash(user1Password, salt)
  const hashedUser2Password = await bcrypt.hash(user2Password, salt)
  // Inserts seed entries
  await knex(userAccountsTable).insert([
    { 
      phone: "phone1", 
      email: user1Email, 
      password: hashedUser1Password, 
      role: "admin", 
      is_verified: true 
    },
    { 
      phone: "phone2", 
      email: user2Email, 
      password: hashedUser2Password, 
      role: "user", 
      is_verified: false  
    },
  ]);
}
