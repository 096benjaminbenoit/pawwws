import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { CaresType } from '../enums/cares_type.js'
import Animal from '#models/animal'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Care extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: CaresType

  @column()
  declare startAt: Date

  @column()
  declare endAt: Date | null

  @column()
  declare veterinarian: string | null

  @column()
  declare comment: string | null

  @column()
  declare animalId: number

  @belongsTo(() => Animal)
  declare animal: BelongsTo<typeof Animal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
