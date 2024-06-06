import vine from '@vinejs/vine'
import { SexType } from '../enums/sex_types.js'
import { AnimalSpecies } from '../enums/animal_species.js'

export const createAnimal = vine.compile(
  vine.object({
    identificationNumber: vine
      .string()
      .regex(/^\d{15}$/)
      .trim(),
    name: vine.string().trim(),
    color: vine.string().trim(),
    birthDate: vine.date(),
    arrivalDate: vine.date(),
    isSterilized: vine.boolean(),
    sex: vine.enum(Object.values(SexType)),
    species: vine.enum(Object.values(AnimalSpecies)),
    race: vine.string().trim(),
    comment: vine.string().trim().nullable().optional(),
    isAdopted: vine.boolean(),
    adoptionStart: vine.date().nullable().optional(),
    adoptionend: vine.date().nullable().optional(),
    adoptiveFamilyId: vine.number().nullable().optional(),
    isHosted: vine.boolean(),
    hostingStart: vine.date().nullable().optional(),
    hostingEnd: vine.date().nullable().optional(),
    hostFamilyId: vine.number().nullable().optional(),
  })
)
