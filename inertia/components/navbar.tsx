import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'
import { Button, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { User } from '~/types/user'
import { useState } from 'react'
import LayoutInputSearch from './layout_input_search'

export default function Navbar({
  isOpen,
  setIsOpen,
  user,
  query,
  setQuery,
}: {
  isOpen: boolean
  setIsOpen: any
  user: User
  query: string
  setQuery: any
}) {
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <>
      <Head title="Tableau de bord" />
      <nav className="fixed w-full md:w-[calc(100vw-17rem)] z-20 top-0 end-0 border-b border-gray-200 shadow-sm bg-white md:px-4">
        <div className="w-full flex flex-wrap items-center justify-between  mx-auto p-4">
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <Bars3Icon className="w-6" /> : <XMarkIcon className="w-6" />}
          </button>
          <div className="relative w-1/2 hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 text-gray-400" />
            </div>
            <LayoutInputSearch query={query} setQuery={setQuery} />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={() => setOpenSearch(!openSearch)} className="block md:hidden">
              <MagnifyingGlassIcon className="w-7" />
            </Button>

            <Popover className="relative flex">
              <PopoverButton className="hover:scale-[1.05] transition-all relative">
                <BellIcon className="w-8" />
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-error rounded-full -top-1 -end-1">
                  2
                </div>{' '}
              </PopoverButton>
              <PopoverPanel
                anchor="bottom end"
                className="flex flex-col bg-white py-2 rounded-lg border border-gray-200 shadow-sm z-[99]"
              >
                <Link className="px-4 py-1 hover:bg-gray-100" href="#">
                  Notification 1
                </Link>
                <Link className="px-4 py-1 hover:bg-gray-100" href="#">
                  Notification 2
                </Link>
                <Link className="px-4 py-1 hover:bg-gray-100" href="#">
                  Notification 3
                </Link>
              </PopoverPanel>
            </Popover>

            <Popover className="relative">
              <PopoverButton className="focus:outline-none bg-primary h-8 w-8 flex justify-center items-center text-white rounded-full p-2 font-semibold hover:opacity-80 transition-all">
                {(user as User).email.charAt(0).toUpperCase()}
              </PopoverButton>
              <PopoverPanel
                anchor="bottom end"
                className="flex flex-col bg-white py-2 rounded-lg border border-gray-200 shadow-sm z-[99]"
              >
                <Link className="px-4 py-1 hover:bg-gray-100" href="#">
                  Mon compte
                </Link>
                <Link
                  className="px-4 py-1 hover:bg-gray-100 hover:text-error"
                  href="/api/auth/logout"
                  method="post"
                  as="button"
                  type="button"
                >
                  Déconnexion
                </Link>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
        {openSearch === true && (
          <div className="relative w-full mb-4 md:hidden px-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-6 md:ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 text-gray-400" />
            </div>
            <LayoutInputSearch query={query} setQuery={setQuery} />
          </div>
        )}
      </nav>
    </>
  )
}
