import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ErrorsAlert from "./ErrorsAlert";
import { Form } from "~/form";
import { schema } from "~/schema/schema";
import ToggleFormType from "./ToggleFormType";
import { useState } from "react";

export default function LoginForm() {
  const [formType, setFormType] = useState<'email' | 'name'>('email')
  return (
    <Paper sx={{ paddingBlock: 4, paddingInline: 8, maxWidth: 240 }} >
      <Typography variant='h4' gutterBottom>Example Form</Typography>
      <Form
        schema={schema}
        onTransition={({ reset, formState: { isSubmitSuccessful } }) => {
          if (isSubmitSuccessful) {
            reset()
            setFormType('email')
          }
        }}
      >
        {({
          clearErrors,
          Field,
          formState: { errors },
          register,
          setFocus,
          setValue,
        }) => {
          const changeType = (_e: any, value: 'email' | 'name') => {
            clearErrors();
            setValue('type', value);
            setFormType(value)
            setValue('password', '')
            if (formType === 'email') {
              setValue('name', undefined)
              setFocus('email');
            }
            if (formType === 'name') {
              setValue('email', undefined)
              setFocus('name');
            }
          }
          return (
            <Box
              display='flex'
              flexDirection='column'
              gap={2}
              alignContent="center"
              alignItems='stretch'
              justifyItems='center'
            >
              <ToggleFormType value={formType} onChange={changeType} />
              <Field name='type' hidden={true} />
              {
                formType === 'email'
                  ? (
                    <Field name='email' type="email">
                      {() => (
                        <TextField {...register('email')} type='email' label='Email' />
                      )}
                    </Field>
                  ) : (
                    <Field name='name'>
                      {() => (
                        <TextField {...register('name')} label='Name' />
                      )}
                    </Field>
                  )
              }
              <Field name='password'>
                {() => (
                  <TextField {...register('password')} type='password' label='Password' />
                )}
              </Field>
              <Button type='submit' variant='contained' fullWidth>Send</Button>
              <ErrorsAlert errors={Object.entries(errors)} />
            </Box>
          );
        }}
      </Form >
    </Paper>
  )
}