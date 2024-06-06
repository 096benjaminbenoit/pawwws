import { DocumentArrowDownIcon, EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Head, Link, router } from '@inertiajs/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '~/layouts/layout'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { Animal } from '~/types/animal'
import InfiniteScroll from 'react-infinite-scroll-component'
import useScreenSize from '~/hooks/use_screen_size'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Pagination from '~/components/pagination'
import AnimalCardSkeleton from '~/components/animal_card_skeleton'
import TabSkeleton from '~/components/tab_skeleton'

export default function Animals() {
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const screen = useScreenSize()
  const params = window.location.search

  function formatDate(date: string) {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('fr')
  }

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
      if (!params) {
        const response = await axios.get(`/api/animals?page=1`)
        setMeta(response.data.meta)
        setData(response.data.data)
        setLoading(false)
      } else {
        const response = await axios.get(`/api/animals${params}`)
        setMeta(response.data.meta)
        setData(response.data.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  async function fetchMore() {
    try {
      const response = await axios.get(`/api/animals${meta.nextPageUrl || ''}`)
      setTimeout(() => {
        setData(data.concat(response.data.data))
        setMeta(response.data.meta)
      }, 300)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [params])

  return (
    <Layout>
      <Head title="Animaux" />
      <h1 className="text-2xl font-medium text-center md:mt-2">Tous vos animaux 🐈‍⬛</h1>
      {screen.width < 768 ? (
        <>
          <section className="flex justify-center items-center gap-3 pt-4">
            <button
              onClick={() => exportCsv()}
              className="flex justify-center items-center bg-primary text-white font-medium px-4 py-2 rounded-lg w-full gap-2 hover:opacity-80 transition-all"
            >
              <DocumentArrowDownIcon className="w-6" />
              Exporter
            </button>{' '}
            <button className="flex justify-center items-center bg-primary text-white font-medium px-4 py-2 rounded-lg w-full gap-2 hover:opacity-80 transition-all">
              <PlusIcon className="w-6" />
              Nouveau
            </button>
          </section>
          <InfiniteScroll
            className="py-4 space-y-4"
            dataLength={data.length}
            next={fetchMore}
            hasMore={data.length !== meta.total}
            loader={<AnimalCardSkeleton />}
          >
            {data.map((animal: Animal) => (
              <Link
                key={animal.id}
                href={`/tableau-de-bord/animaux/detail/${animal.id}/${animal.name}`}
                className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                  {animal.name.charAt(0).toUpperCase() + animal.name.slice(1)}
                </h5>
                <p className="font-normal mb-2">{animal.identificationNumber}</p>
                <p className="font-normal">
                  {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)}{' '}
                  {animal.color.charAt(0).toUpperCase() + animal.color.slice(1)} arrivé le{' '}
                  {formatDate(animal.arrivalDate)}
                </p>
              </Link>
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <>
          <div className="flex justify-end items-center gap-3 p-4">
            <button
              onClick={() => exportCsv()}
              className="flex justify-center items-center bg-primary text-white font-medium px-4 py-2 rounded-lg gap-2 hover:opacity-80 transition-all"
            >
              <DocumentArrowDownIcon className="w-6" />
              Exporter
            </button>{' '}
            <button className="flex justify-center items-center bg-primary text-white font-medium px-4 py-2 rounded-lg gap-2 hover:opacity-80 transition-all">
              <PlusIcon className="w-6" />
              Nouveau
            </button>
          </div>
          {loading === true ? (
            <TabSkeleton />
          ) : (
            <>
              <div className="relative overflow-x-auto shadow-sm sm:rounded-lg border border-gray-200 mx-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nom
                      </th>
                      <th scope="col" className="px-6 py-3">
                        N° identification
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Espèce
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Couleur
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((animal: Animal) => (
                      <tr className="bg-white border-b" key={animal.id}>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {animal.name.charAt(0).toUpperCase() + animal.name.slice(1)}
                        </td>
                        <td className="px-6 py-4">{animal.identificationNumber}</td>
                        <td className="px-6 py-4">
                          {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)}
                        </td>
                        <td className="px-6 py-4">
                          {animal.color.charAt(0).toUpperCase() + animal.color.slice(1)}
                        </td>
                        <Popover as="td" className="relative px-6 py-4">
                          <PopoverButton className="focus:outline-none">
                            <EllipsisVerticalIcon className="w-6" />
                          </PopoverButton>
                          <PopoverPanel
                            anchor="left start"
                            className="flex flex-col bg-white shadow-sm border border-gray-200 p-3 rounded-lg"
                          >
                            <Link
                              href={`/tableau-de-bord/animaux/detail/${animal.id}/${animal.name}`}
                            >
                              Voir
                            </Link>
                            <Link
                              href={`/tableau-de-bord/animaux/detail/${animal.id}/${animal.name}`}
                            >
                              Modifier
                            </Link>
                          </PopoverPanel>
                        </Popover>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination meta={meta} path={'/tableau-de-bord/animaux'} />{' '}
            </>
          )}
        </>
      )}
    </Layout>
  )
}
