import { Box, } from "@mui/material";
import { makeDomainFunction } from 'domain-functions'
import { schema } from "~/schema/schema";
import { ActionArgs, LoaderArgs, V2_MetaFunction, json, redirect } from "@remix-run/node";
import LoginForm from "~/components/LoginForm";
import { performMutation } from "remix-forms";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

const mutation = makeDomainFunction(schema)(async (values) => {
  console.log(values)
  return values;
})

export const action = async ({ request }: ActionArgs) => {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (!result.success) return json(result, 400)


  let user = await authenticator.authenticate("user-pass", request, {
    failureRedirect: "/login",
  });

  // manually get the session
  let session = await getSession(request.headers.get("cookie"));
  // and store the user data
  session.set(authenticator.sessionKey, user);

  // commit the session
  let headers = new Headers({ "Set-Cookie": await commitSession(session) });

  // and do your validation to know where to redirect the user
  return redirect("/", { headers });
}

export async function loader({ request }: LoaderArgs) {
  console.log('LOGIN LOADER')
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export default function LoginPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <LoginForm />
    </Box >
  )
}
