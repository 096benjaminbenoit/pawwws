import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserRole } from '../../app/enums/user_roles.js'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'benjamin@example.com',
        password: 'motdepasse',
        isVerified: true,
        role: UserRole.ADMIN,
        organizationId: 1,
      },
      {
        email: 'invité@example.com',
        password: 'motdepasse',
        isVerified: false,
        role: UserRole.USER,
        organizationId: 2,
      },
    ])
  }
}
