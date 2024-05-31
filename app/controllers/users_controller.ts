import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index({ inertia }: HttpContext) {
    return inertia.render('dashboard/users')
  }

  show({ inertia }: HttpContext) {
    return inertia.render('users/show')
  }

  create({ inertia }: HttpContext) {
    return inertia.render('users/create')
  }

  update({ inertia }: HttpContext) {
    return inertia.render('users/edit')
  }
}
