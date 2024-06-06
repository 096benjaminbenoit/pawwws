import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { User } from '~/types/user'
import SidebarItem from './sidebar_item'
import PawIcon from './paw_icon'
import { Link } from '@inertiajs/react'

export default function SideBar({ isOpen, user }: { isOpen: boolean; user: User }) {
  return (
    <aside
      className={`fixed bottom-0 left-0 z-40 w-64 h-[calc(100vh-64px)] md:h-screen transition-transform -translate-x-full md:translate-x-0 ${isOpen && 'translate-x-0'}`}
    >
      <div className="h-full px-8 py-4 overflow-y-auto bg-dark shadow-sm flex flex-col justify-start">
        <div className="pb-12">
          <Link href="/tableau-de-bord" className="items-center rtl:space-x-reverse flex">
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              Pawwws.
            </h1>
          </Link>
        </div>
        <ul className="space-y-2">
          <SidebarItem title="Animaux" url="/tableau-de-bord/animaux">
            <PawIcon className="w-5 h-5" />
          </SidebarItem>
          <SidebarItem title="Familles" url="/tableau-de-bord/familles">
            <HomeIcon className="w-5 h-5" />
          </SidebarItem>
          {user.role === 'admin' && (
            <SidebarItem title="Utilisateurs" url="/tableau-de-bord/utilisateurs">
              <UserGroupIcon className="w-5 h-5" />
            </SidebarItem>
          )}
        </ul>
      </div>
    </aside>
  )
}
