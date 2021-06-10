import { InputType, Field } from 'type-graphql';

@InputType()
export default class AuthInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
