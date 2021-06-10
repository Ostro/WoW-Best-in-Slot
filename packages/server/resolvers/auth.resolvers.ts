import { Query, Arg } from 'type-graphql';
import userService from '../services/userService';

export default class AuthResolver {
  @Query(() => Boolean)
  async authenticate(@Arg('username') username: string, @Arg('password') password: string): Promise<boolean> {
    const user = await userService.authenticate(username, password);

    return !!user?.id;
  }
}
