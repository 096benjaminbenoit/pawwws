import User from '#models/user'
import { loginUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async loginUser({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginUserValidator)
      const user = await User.verifyCredentials(payload.email, payload.password)
      if (!user) return response.status(401).send({ message: 'Invalid credentials' })
      await auth.use('web').login(user)
      return response.status(200).send({ message: 'User connected successfully' })
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  async logoutUser({ auth, response }: HttpContext) {
    try {
      auth.use('web').logout()
      return response.redirect().toRoute('login')
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  loginPage({ inertia }: HttpContext) {
    return inertia.render('login')
  }
}
