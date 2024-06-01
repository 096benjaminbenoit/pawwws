import Animal from '#models/animal'
import { createAnimal } from '#validators/animal'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_roles.js'

export default class AnimalsController {
  index({ inertia, auth, response }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be connected' })

    return inertia.render('dashboard/animals')
  }

  async getAnimals({ auth, response, request }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be loggedin' })

    const page = request.input('page', 1)
    const limit = 10

    try {
      const animals = await Animal.query()
        .where('organization_id', auth.user.organizationId)
        .paginate(page, limit)

      if (!animals) return response.status(400).send({ messag: 'No animals found' })

      return response.status(200).send(animals)
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  async search({ auth, response, request }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be loggedin' })
    const query = request.input('query')

    try {
      const results = await Animal.query()
        .whereILike('name', `%${query}%`)
        .orWhereILike('identification_number', `%${query}%`)

      return response.status(200).send({ results })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  show({ inertia }: HttpContext) {
    return inertia.render('animals/show')
  }

  create({ inertia }: HttpContext) {
    return inertia.render('animals/create')
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      if (!auth.user) return response.status(401).send({ message: 'You must be connected' })
      if (auth.user.role !== UserRole.ADMIN)
        return response.status(401).send({ message: 'You must be an admin' })

      const payload = await request.validateUsing(createAnimal)
      if (!payload) return response.status(400).send({ message: 'Invalid data' })

      if (await Animal.findBy('identification_number', payload.identificationNumber))
        return response.status(400).send({ message: 'This animal already register' })

      const newAnimal = new Animal()
      Object.assign(newAnimal, payload)
      newAnimal.organizationId = auth.user.organizationId

      await newAnimal.save()
      response.status(201).send({ message: 'Animal created successfully' })
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
    }
  }

  edit({ inertia }: HttpContext) {
    return inertia.render('animals/edit')
  }
}
