import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Animal from '#models/animal'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Family extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

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

  @column()
  declare comment: string | null

  @hasMany(() => Animal)
  declare animals: HasMany<typeof Animal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
