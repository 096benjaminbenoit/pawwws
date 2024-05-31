/* eslint-disable prettier/prettier */
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const DashboardController = () => import('#controllers/dashboard_controller')
const AuthController = () => import('#controllers/auth_controller')
const RegistrationController = () => import('#controllers/registration_controller')

router.on('/').renderInertia('home', { version: 6 })

router
  .group(() => {
    router
      .post('/register', [RegistrationController, 'register'])
      .use(middleware.guest())

    router
      .post('/send-invitation', [RegistrationController, 'sendInvitation'])
      .use(middleware.auth())

    router
      .post('/register/:token', [RegistrationController, 'registerUserByInvitation'])
      .use(middleware.guest())

    router
      .post('/auth/login', [AuthController, 'loginUser'])
      .use(middleware.guest())

    router
      .post('/auth/logout', [AuthController, 'logoutUser'])
      .use(middleware.auth())
  })
  .prefix('/api')

router.group(() => {
  router
    .get('/connexion', [AuthController, 'loginPage'])
    .as('login')
    .use(middleware.guest())

  router
    .get('/inscription', [RegistrationController, 'registrationPage'])
    .as('register')
    .use(middleware.guest())

  router.group(() => {
    router
      .get('', [DashboardController, 'index'])
      .as('dashboard')

      router
      .get('/animaux', [DashboardController, 'animalsPage'])
      .as('dashboard.animals')

      router
      .get('/familles', [DashboardController, 'familiesPage'])
      .as('dashboard.families')

      router
      .get('/utilisateurs', [DashboardController, 'usersPage'])
      .as('dashboard.users')
  })
  .prefix('/tableau-de-bord')
  .use(middleware.auth())
})
