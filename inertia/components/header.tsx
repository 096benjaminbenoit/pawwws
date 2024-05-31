import { Bars3Icon, BellAlertIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Sidebar from './sidebar'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { usePage } from '@inertiajs/react'

type User = {
  email: string
  role: string
}

type PageProps = {
  user: User
}

export default function Header() {
  const { user } = usePage<PageProps>().props as PageProps
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = window.location.pathname

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-4 md:px-9 bg-white shadow-lg">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <XMarkIcon className="w-8 text-dark" />
          ) : (
            <Bars3Icon className="w-8 text-dark" />
          )}
        </button>
        <h1 className="font-semibold text-primary text-xl hidden md:block">
          <a href="/tableau-de-bord">PAWWWS.</a>
        </h1>
        <ul className="gap-2 flex-row items-center lg:gap-6 hidden md:flex">
          <li
            className={`block p-1 font-sans text-sm antialiased leading-normal text-blue-gray-900 hover:bg-primary hover:text-white rounded-lg transition-all ease-in-out font-normal ${currentPath === '/tableau-de-bord/animaux' ? 'text-white bg-primary' : ''}`}
          >
            <a href="/tableau-de-bord/animaux" className="flex items-center text-lg px-4">
              Animaux
            </a>
          </li>
          |
          <li
            className={`block p-1 font-sans text-sm antialiased leading-normal text-blue-gray-900 hover:bg-primary hover:text-white rounded-lg transition-all ease-in-out font-normal ${currentPath === '/tableau-de-bord/familles' ? 'text-white bg-primary' : ''}`}
          >
            {' '}
            <a href="/tableau-de-bord/familles" className="flex items-center text-lg px-4">
              Familles
            </a>
          </li>
          {user.role === 'admin' && (
            <>
              |
              <li
                className={`block p-1 font-sans text-sm antialiased leading-normal text-blue-gray-900 hover:bg-primary hover:text-white rounded-lg transition-all ease-in-out font-normal ${currentPath === '/tableau-de-bord/utilisateurs' ? 'text-white bg-primary' : ''}`}
              >
                {' '}
                <a href="/tableau-de-bord/utilisateurs" className="flex items-center text-lg px-4">
                  Utilisateurs
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="flex justify-center items-center gap-3">
          <button
            type="button"
            className="relative inline-flex items-center text-dark hover:opacity-80"
          >
            <BellAlertIcon className="w-8 h-8" />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -end-2">
              2
            </div>
          </button>
          <Popover className="relative">
            <PopoverButton className="w-8 h-8 bg-primary rounded-full flex justify-center items-center font-bold text-white focus:outline-none hover:opacity-80 transition ease-in-out">
              {user.email.charAt(0).toUpperCase()}
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              className="flex flex-col bg-white shadow-lg p-4 rounded-lg space-y-3"
            >
              <p className="font-light">{user.email}</p>
              <a href="/security" className="transition-all hover:font-medium">
                Mon compte
              </a>
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="hover:text-error transition-all ease-in-out hover:font-medium"
                >
                  Déconnexion
                </button>
              </form>
            </PopoverPanel>
          </Popover>
        </div>
      </nav>
      {isOpen && <Sidebar user={user} currentPath={currentPath} />}
    </>
  )
}
