import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(3).trim(),
    password: vine.string().minLength(8).trim(),
    name: vine.string().minLength(3).maxLength(255).trim(),
    telephone: vine
      .string()
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .trim(),
    address: vine.string().minLength(3).trim(),
    postalCode: vine
      .string()
      .regex(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/)
      .trim(),
    city: vine.string().minLength(2).trim(),
    country: vine.string().minLength(2).trim(),
  })
)
