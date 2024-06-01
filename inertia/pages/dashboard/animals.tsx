import { Button } from '@headlessui/react'
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { Head, router } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DashboardLayout from '~/layouts/dashboard_layout'
import { Animal } from '~/types/animal'
import { saveAs } from 'file-saver'
import InfiniteScroll from 'react-infinite-scroll-component'
import AnimalCardItem from '~/components/dashboard/animals/animal_card_item'
import AnimalTableItem from '~/components/dashboard/animals/animal_table_item'

export default function Animals() {
  const [animals, setAnimals] = useState([])
  let [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState('')

  async function exportCsv() {
    try {
      const response = await axios.get('/api/animals/export-csv', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      saveAs(url, 'animals_data.csv')

      router.visit('/tableau-de-bord/animaux')
      toast.success('Votre fichier a bien été exporté')
    } catch (error) {
      console.log(error)
      toast.error("Erreur lors de l'exportation du fichier")
    }
  }

  async function fetchAnimals() {
    try {
      const res = await axios.get(`/api/animals/?page=1`)
      setTotal(res.data.meta.total)
      setAnimals(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function search() {
    try {
      setPage(1)
      const res = await axios.get(`/api/animals/search?query=${query}`)
      setAnimals(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (query.length >= 3) {
      search()
    } else {
      fetchAnimals()
    }
  }, [query])

  function fetchMore() {
    setTimeout(async () => {
      setPage(++page)
      try {
        const res = await axios.get(`/api/animals/?page=${page}`)
        setAnimals(animals.concat(res.data.data))
      } catch (error) {
        console.log(error)
      }
    }, 800)
  }

  return (
    <>
      <Head title="Animaux" />
      <DashboardLayout>
        <div className="flex flex-col items-center w-full h-full md:bg-lightbase">
          <h1 className="text-center pt-4 font-medium text-2xl">Tous vos animaux 🐈‍⬛</h1>
          <section className="relative flex w-full h-full flex-col bg-clip-border text-gray-700 shadow-md md:hidden">
            <div className="flex items-center justify-between gap-3 w-full mt-4 px-4">
              <Button
                onClick={() => exportCsv()}
                className="bg-primary py-2 px-3 text-white font-medium hover:opacity-80 transition-all cursor-pointer rounded-lg w-full flex items-center justify-center gap-2"
              >
                <DocumentArrowDownIcon className="w-6" />
                Export
              </Button>
              <Button className="bg-primary py-2 px-3 text-white font-medium hover:opacity-80 transition-all cursor-pointer rounded-lg w-full flex items-center justify-center gap-2">
                <PlusCircleIcon className="w-6" />
                Nouveau
              </Button>
            </div>
            <div className="relative mx-4 my-4">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 text-gray-500" />
              </div>
              <input
                type="search"
                className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-lg"
                placeholder="Rechercher un animal ..."
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              {animals.length <= 0 ? (
                <p className="text-center">Aucun animal trouvé ..</p>
              ) : (
                <InfiniteScroll
                  className="divide-y divide-gray-200 pb-4"
                  dataLength={animals.length}
                  next={fetchMore}
                  hasMore={total > animals.length}
                  loader={
                    <div className="flex justify-center items-center h-16 gap-4 text-xl">
                      <ArrowPathIcon className="w-5 animate-spin" />
                      Chargement en cours
                    </div>
                  }
                >
                  {animals.map((animal: Animal) => (
                    <AnimalCardItem animal={animal} />
                  ))}
                </InfiniteScroll>
              )}
            </div>
          </section>
          <section className="h-full w-full container py-6 pb-10 hidden md:block">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border rounded-lg divide-y divide-gray-200 shadow-md bg-white">
                    <div className="py-3 px-4 flex justify-between items-center">
                      <div className="relative w-1/3">
                        <label className="sr-only">Search</label>
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          type="text"
                          name="query"
                          className="py-2 px-3 ps-9 block w-full border-gray-200 border shadow-sm rounded-lg text-sm"
                          placeholder="Rechercher un animal ..."
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                          <MagnifyingGlassIcon className="w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <Button
                          onClick={() => exportCsv()}
                          className="bg-primary py-2 px-4 text-white font-medium hover:opacity-80 transition-all cursor-pointer rounded-lg w-full flex items-center justify-center gap-2"
                        >
                          <DocumentArrowDownIcon className="w-6" />
                          Export
                        </Button>
                        <Button className="bg-primary py-2 px-4 text-white font-medium hover:opacity-80 transition-all cursor-pointer rounded-lg w-full flex items-center justify-center gap-2">
                          <PlusCircleIcon className="w-6" />
                          Nouveau
                        </Button>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50 ">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                            >
                              N°identification
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                            >
                              Nom
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                            >
                              Espèce
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                            >
                              Couleur
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase "
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {animals.map((animal: Animal) => (
                            <AnimalTableItem animal={animal} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  )
}
