import vine from '@vinejs/vine'

export const emailValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(3).trim(),
  })
)
