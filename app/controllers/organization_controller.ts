import Organization from '#models/organization'
import { createOrganizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  async registerOrganization({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createOrganizationValidator)
      if (!payload) return response.status(400).send({ message: 'Form is empty' })

      const newOrganization = new Organization()
      Object.assign(newOrganization, payload)

      await newOrganization.save()

      session.put('organizationId', newOrganization.id)
      console.log(session.get('organizationId'))

      return response.status(201).send({ message: 'Organization created successfully' })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }
}
