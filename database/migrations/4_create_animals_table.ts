import { BaseSchema } from '@adonisjs/lucid/schema'
import { SexType } from '../../app/enums/sex_types.js'
import { AnimalSpecies } from '../../app/enums/animal_species.js'

export default class extends BaseSchema {
  protected tableName = 'animals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('identification_number').unique().notNullable()
      table.string('name').notNullable()
      table.string('color').nullable()
      table.date('birth_date').notNullable()
      table.date('arrival_date').notNullable()
      table.boolean('is_sterilized').defaultTo(false).notNullable()
      table.enum('sex', Object.values(SexType)).notNullable()
      table.enum('species', Object.values(AnimalSpecies)).notNullable()
      table.string('race').notNullable()
      table.text('comment').nullable()
      table.boolean('is_adopted').defaultTo(false).notNullable()
      table.date('adoption_date').nullable()
      table.integer('adoptive_family_id').references('families.id').nullable()
      table.boolean('is_hosted').defaultTo(false).notNullable()
      table.date('hosting_date').nullable()
      table.integer('host_family_id').references('families.id').onDelete('SET NULL').nullable()
      table
        .integer('organization_id')
        .references('organizations.id')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
