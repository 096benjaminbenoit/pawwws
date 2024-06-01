/* eslint-disable prettier/prettier */

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const DashboardController = () => import('#controllers/dashboard_controller')
const AnimalsController = () => import('#controllers/animals_controller')
const FamiliesController = () => import('#controllers/families_controller')
const UsersController = () => import('#controllers/users_controller')

router.group(() => {
    router.get('', [DashboardController, 'index']).as('dashboard')
    router.get('/animaux', [AnimalsController, 'index']).as('dashboard.animals')
    router.get('/familles', [FamiliesController, 'index']).as('dashboard.families')
    router.get('/utilisateurs', [UsersController, 'index']).as('dashboard.users')
  })
.prefix('/tableau-de-bord')
.use(middleware.auth())
