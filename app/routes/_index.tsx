import { Box, Button, } from "@mui/material";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return user
}

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <Box
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <p>{data.type}</p>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <p>{data.password}</p>
      <Form method='post'>
        <Button type='submit'>Logout</Button>
      </Form>
    </Box >
  )
}
