import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Animal from '#models/animal'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare telephone: string

  @column()
  declare address: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare country: string

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => Animal)
  declare animals: HasMany<typeof Animal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
