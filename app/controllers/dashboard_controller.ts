import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  index({ inertia }: HttpContext) {
    return inertia.render('dashboard/index')
  }

  animalsPage({ inertia }: HttpContext) {
    return inertia.render('dashboard/animals')
  }

  familiesPage({ inertia }: HttpContext) {
    return inertia.render('dashboard/families')
  }

  usersPage({ inertia }: HttpContext) {
    return inertia.render('dashboard/users')
  }
}
