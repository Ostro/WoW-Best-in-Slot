import { InputType, Field } from 'type-graphql';

@InputType()
export default class AuthInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
