/* eslint-disable prettier/prettier */

import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const RegistrationController = () => import('#controllers/registration_controller')

router.group(() => {
  router.post('/register', [RegistrationController, 'register']).use(middleware.guest())
  router.post('/send-invitation', [RegistrationController, 'sendInvitation']).use(middleware.auth())
  router.post('/register/:token', [RegistrationController, 'registerUserByInvitation']).use(middleware.guest())
  router.post('/login', [AuthController, 'loginUser']).use(middleware.guest())
  router.post('/logout', [AuthController, 'logoutUser']).use(middleware.auth())
})
.prefix('/api/auth')

router.group(() => {
    router.get('/connexion', [AuthController, 'loginPage']).as('login').use(middleware.guest())
    router.get('/inscription', [RegistrationController, 'registrationPage']).as('register').use(middleware.guest())
})
