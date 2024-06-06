import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { SexType } from '../enums/sex_types.js'
import { AnimalSpecies } from '../enums/animal_species.js'
import Family from '#models/family'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organization from '#models/organization'

export default class Animal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare identificationNumber: string

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare birthDate: Date

  @column()
  declare arrivalDate: Date

  @column()
  declare isSterilized: boolean

  @column()
  declare sex: SexType

  @column()
  declare species: AnimalSpecies

  @column()
  declare race: string

  @column()
  declare comment: string | null

  @column()
  declare isAdopted: boolean

  @column()
  declare adoptionStart: Date | null

  @column()
  declare adoptionEnd: Date | null

  @column()
  declare adoptiveFamilyId: number | null

  @belongsTo(() => Family, {
    foreignKey: 'adoptiveFamilyId',
  })
  declare adoptiveFamily: BelongsTo<typeof Family>

  @column()
  declare isHosted: boolean

  @column()
  declare hostingStart: Date | null

  @column()
  declare hostingEnd: Date | null

  @column()
  declare hostingFamilyId: number | null

  @belongsTo(() => Family, {
    foreignKey: 'hostingFamilyId',
  })
  declare hostingFamily: BelongsTo<typeof Family>

  @column()
  declare organizationId: number

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
