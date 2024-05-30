import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(3).maxLength(255).trim(),
    password: vine.string().minLength(8).trim(),
  })
)
