import { createForm } from 'remix-forms'
import { Form as RemixForm, useActionData, useSubmit, useNavigation } from '@remix-run/react'
import type { FormProps, FormSchema } from 'remix-forms'

const BaseForm = createForm({ component: RemixForm, useNavigation, useSubmit, useActionData })

function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <BaseForm<Schema>
      {...props}
    />
  )
}

export { Form }