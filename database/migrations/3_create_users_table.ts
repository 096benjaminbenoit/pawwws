import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../app/enums/user_roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').nullable()
      table.enum('role', Object.values(UserRole)).defaultTo(UserRole.USER).notNullable()
      table.string('magic_link_token').nullable()
      table.string('email_confirmation_token').nullable()
      table.string('reset_password_token').nullable()
      table.boolean('is_verified').defaultTo(false).notNullable()
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
