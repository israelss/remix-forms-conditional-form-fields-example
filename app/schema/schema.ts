import { z } from 'zod'

export const schema = z.object({
  email: z.string().email({ message: 'Insert a valid email' }).optional(),
  name: z.string().optional(),
  password: z.string().min(6, { message: 'Insert a password with at least 6 characters' }),
  type: z.enum(['email', 'name']).default('email'),
}).superRefine((input, ctx) => {
  if (input.type === 'email') {
    const email = input.email
    const invalidEmail = !Boolean(email) || email === ''
    if (invalidEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        message: 'Insert a valid email',
        validation: 'email',
        path: ['email']
      })
      return z.NEVER
    }
    return input
  }
  if (input.type === 'name') {
    const name = input.name
    const invalidName = !Boolean(name) || name!.length < 5
    if (invalidName) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        message: 'Insert a name with at least 5 characters',
        minimum: 5,
        type: 'string',
        inclusive: true,
        path: ['name']
      })
      return z.NEVER
    }

    return input
  }
  return false
})
