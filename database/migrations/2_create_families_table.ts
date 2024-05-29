import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'families'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('telephone').notNullable()
      table.string('address').notNullable()
      table.string('postal_code').notNullable()
      table.string('city').notNullable()
      table.string('country').notNullable()
      table.text('comment').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
