import type { HttpContext } from '@adonisjs/core/http'

export default class AnimalsController {
  index({ inertia }: HttpContext) {
    return inertia.render('dashboard/animals')
  }

  show({ inertia }: HttpContext) {
    return inertia.render('animals/show')
  }

  create({ inertia }: HttpContext) {
    return inertia.render('animals/create')
  }

  edit({ inertia }: HttpContext) {
    return inertia.render('animals/edit')
  }
}
