import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";

export type User = {
  email: string | undefined;
  name: string | undefined;
  password: string;
  type: 'email' | 'name';
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let user: User = {
      email: form.get('email') as string | undefined,
      name: form.get('name') as string | undefined,
      password: form.get('password') as string,
      type: form.get('type') as  'email' | 'name'
    }

    console.log({user})
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

