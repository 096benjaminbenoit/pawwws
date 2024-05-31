/* eslint-disable prettier/prettier */
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AnimalsController = () => import('#controllers/animals_controller')
const FamiliesController = () => import('#controllers/families_controller')
const UsersController = () => import('#controllers/users_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const AuthController = () => import('#controllers/auth_controller')
const RegistrationController = () => import('#controllers/registration_controller')

router.on('/').renderInertia('home', { version: 6 })

  // ------------------- POST / UPDATE / DELETE METHODS ------------------- //

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

    router.group(() => {
      router
      .post('/login', [AuthController, 'loginUser'])
      .use(middleware.guest())

    router
      .post('/logout', [AuthController, 'logoutUser'])
      .use(middleware.auth())
    })
    .prefix('/auth')

    router.group(() => {
      router
        .post('/store', [AnimalsController, 'store'])
    })
    .prefix('/animals')
    .use(middleware.auth())
  })
  .prefix('/api')

  // ------------------- GET METHODS ------------------- //

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
      .get('/animaux', [AnimalsController, 'index'])
      .as('dashboard.animals')

      router
      .get('/familles', [FamiliesController, 'index'])
      .as('dashboard.families')

      router
      .get('/utilisateurs', [UsersController, 'index'])
      .as('dashboard.users')
  })
  .prefix('/tableau-de-bord')
  .use(middleware.auth())
})
