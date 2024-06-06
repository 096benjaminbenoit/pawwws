/* eslint-disable prettier/prettier */

import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'
const AnimalsController = () => import('#controllers/animals_controller')

router
  .group(() => {
    router.get('/', [AnimalsController, 'getAnimals'])
    router.get('search', [AnimalsController, 'getAnimals'])
    router.post('/store', [AnimalsController, 'store'])
    router.get('/export-csv', [AnimalsController, 'downloadAnimalsCsv'])
  })
  .use(middleware.auth())
  .prefix('/api/animals')
