import { Button, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
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

  useEffect(() => {
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
        <div className="flex flex-col items-center w-full h-full">
          <section className="relative flex w-full h-full flex-col bg-clip-border text-gray-700 shadow-md md:hidden">
            <h1 className="text-center pt-2 font-medium text-2xl">Tous vos animaux 🐈‍⬛</h1>

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
                    <a
                      key={animal.id}
                      href={`/tableau-de-bord/animaux/detail/${animal.id}`}
                      className="mx-4 flex items-center justify-between pb-3 pt-3 cursor-pointer hover:shadow-md hover:rounded-lg px-4 transition-all hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-x-3">
                        <div>
                          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                            {animal.name[0].toUpperCase() + animal.name.slice(1)}
                          </h6>
                          <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
                            {animal.identificationNumber}
                          </p>
                        </div>
                      </div>
                      <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                        {animal.species[0].toUpperCase() + animal.species.slice(1)}
                      </h6>
                    </a>
                  ))}
                </InfiniteScroll>
              )}

              {/* {animals.length < total && animals.length >= 3 && (
                <Button
                  onClick={fetchMore}
                  className="bg-primary py-2 px-3 text-white font-medium hover:opacity-80 transition-all cursor-pointer rounded-lg w-full mt-4 mb-6"
                >
                  Afficher plus
                </Button>
              )} */}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  )
}
