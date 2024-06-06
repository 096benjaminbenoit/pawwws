import Animal from '#models/animal'
import { createAnimal } from '#validators/animal'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_roles.js'
import CsvService from '#services/csv_service'

export default class AnimalsController {
  index({ inertia, auth, response }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be connected' })

    return inertia.render('dashboard/animals')
  }

  async getAnimals({ auth, response, request }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be loggedin' })

    const search = request.input('search')
    const page = request.input('page', 1)
    const limit = 10
    let animals

    try {
      if (search) {
        animals = await Animal.query()
          .where('organization_id', auth.user.organizationId)
          .andWhereILike('name', `%${search}%`)
          .orWhereILike('identification_number', `%${search}%`)
          .paginate(page, limit)
      } else {
        animals = await Animal.query()
          .where('organization_id', auth.user.organizationId)
          .paginate(page, limit)
      }
      if (!animals) return response.status(400).send({ messag: 'No animals found' })

      return response.status(200).send(animals)
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  async downloadAnimalsCsv({ response, auth }: HttpContext) {
    if (!auth.user) return response.status(401).send({ message: 'You must be loggedin' })

    const animals = await Animal.query()
      .where('organization_id', auth.user.organizationId)
      .preload('organization')
      .preload('adoptiveFamily')

    const csvService = new CsvService()
    const result = await csvService.convert(animals)

    response.header('Content-Type', 'text/csv')
    response.header('Content-Disposition', 'attachment; filename="animals.csv"')
    return response.send(result)
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
