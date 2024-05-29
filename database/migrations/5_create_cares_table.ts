import { BaseSchema } from '@adonisjs/lucid/schema'
import { CaresType } from '../../app/enums/cares_type.js'

export default class extends BaseSchema {
  protected tableName = 'cares'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.enum('type', Object.values(CaresType)).notNullable()
      table.date('start_at').notNullable()
      table.date('end_at').nullable()
      table.string('veterinarian').nullable()
      table.text('comment').nullable()
      table.integer('animal_id').references('animals.id').onDelete('CASCADE').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
