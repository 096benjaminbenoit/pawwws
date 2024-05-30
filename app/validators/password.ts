import vine from '@vinejs/vine'

export const passwordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(8).trim(),
  })
)
