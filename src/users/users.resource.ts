import {userAccountsTable } from "../database/constants";
import {knexInstance} from "../database/knexInstance";
import { RawUserAccount, UserAccount } from "./users.types";

class UserResource {

  public async registerUser(user: UserAccount): Promise<RawUserAccount>{
    const query =  knexInstance<RawUserAccount>(userAccountsTable).insert(user, '*');
    console.log(query.toString());
    const createdUser = await query;
    return createdUser[0];
  }
}

export const userResource = new UserResource();

