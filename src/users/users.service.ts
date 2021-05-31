import { userResource } from "./users.resource";
import { RawUserAccount, UserAccount } from "./users.types";

class UserService {
  public async registerUser(user: UserAccount): Promise<RawUserAccount>{
    const createdUserAccount = await userResource.registerUser(user);
    return createdUserAccount;
  }

  public async loginUser(user: UserAccount): Promise<RawUserAccount>{
    const currentUserAccount = await userResource.loginUser(user);
    return currentUserAccount;
  }
}
export const userService = new UserService();
