import type { HttpContext } from '@adonisjs/core/http'

export default class FamiliesController {
  index({ inertia }: HttpContext) {
    return inertia.render('dashboard/families')
  }

  show({ inertia }: HttpContext) {
    return inertia.render('families/show')
  }

  create({ inertia }: HttpContext) {
    return inertia.render('families/create')
  }

  edit({ inertia }: HttpContext) {
    return inertia.render('families/edit')
  }
}
