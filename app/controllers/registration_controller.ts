import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_roles.js'
import { emailValidator } from '#validators/email'
import crypto from 'node:crypto'
import mail from '@adonisjs/mail/services/main'
import { env } from 'node:process'
import { passwordValidator } from '#validators/password'

export default class RegistrationController {
  async registerUser({ request, response, session, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createUserValidator)
      if (!payload) return response.status(400).send({ message: 'Form is empty' })

      const newUser = new User()
      Object.assign(newUser, payload)
      newUser.role = UserRole.ADMIN
      newUser.organizationId = session.get('organizationId')

      await newUser.save()

      session.forget('organizationId')

      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)

      return response
        .status(201)
        .send({ message: 'User created successfully, you now connected !' })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  async sendInvitation({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.status(401).send({ message: 'You must be connected' })

      if (user.role !== UserRole.ADMIN)
        return response.status(401).send({ message: 'You must be administrator' })

      if (user.isVerified === false)
        return response.status(401).send({ message: 'Your email must be verified' })

      const newUserEmail = await request.validateUsing(emailValidator)
      if (!newUserEmail) return response.status(400).send({ message: 'Form empty or invalide' })

      if (await User.findBy('email', newUserEmail))
        return response.status(400).send({ message: 'User email already use' })

      const newUser = new User()

      const token = crypto.randomBytes(64).toString('hex')

      newUser.email = newUserEmail.email
      newUser.magicLinkToken = token
      newUser.organizationId = user.organizationId

      await newUser.save()

      await mail.send((message) => {
        message
          .to(newUser.email)
          .from('096benjaminbenoit@gmail.com')
          .subject('Vous avez été invité à utiliser Pawwws')
          .text(
            `Vous avez été invité à utiliser pawwws. Merci de cliquer sur le lien suivant pour finaliser votre inscription : ${env.DOMAIN_URL}/inscription/${token}`
          )
      })

      return response.status(200).send({ message: 'Invitation send successfully' })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  async registerUserByInvitation({ request, response, params: { token } }: HttpContext) {
    try {
      if (!token) return response.status(404).send({ message: 'Token required' })

      let userToRegister = await User.findBy('magic_link_token', token)
      if (!userToRegister) return response.status(400).send({ message: 'User not found' })

      const userPassword = await request.validateUsing(passwordValidator)
      if (!userPassword) return response.status(400).send({ message: 'Password required' })

      userToRegister.password = userPassword.password
      userToRegister.magicLinkToken = null
      userToRegister.isVerified = true

      await userToRegister.save()

      return response.status(201).send({ message: 'User created successfully' })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }
}
