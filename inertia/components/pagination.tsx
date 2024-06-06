import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { router } from '@inertiajs/react'

export default function Pagination({ meta, path }: { meta: any; path: string }) {
  const handlePagination = (url) => {
    if (url) {
      router.visit(url)
    }
  }

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500">
        Affichage{' '}
        <span className="font-semibold text-gray-900">
          {(meta.currentPage - 1) * meta.perPage + 1}-
          {Math.min(meta.currentPage * meta.perPage, meta.total)}
        </span>{' '}
        sur <span className="font-semibold text-gray-900">{meta.total}</span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={() => handlePagination(`${path}${meta.previousPageUrl}`)}
            className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${!meta.previousPageUrl ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={!meta.previousPageUrl}
            aria-label="Previous"
          >
            <ChevronLeftIcon className="w-4" />
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePagination(`${path}${meta.nextPageUrl}`)}
            className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${!meta.nextPageUrl ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={!meta.nextPageUrl}
            aria-label="Next"
          >
            <ChevronRightIcon className="w-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
