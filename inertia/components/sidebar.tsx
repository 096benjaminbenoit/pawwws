import {
  HeartIcon,
  HomeIcon,
  PresentationChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

type User = {
  email: string
  role: string
}

export default function Sidebar({ user, currentPath }: { user: User; currentPath: string }) {
  return (
    <div className="fixed left-0 z-40 flex h-[calc(100vh-64px)] w-full max-w-[20rem] flex-col bg-white bg-clip-border border-r p-4 text-dark shadow-lg">
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal">
        <a
          href="/tableau-de-bord"
          className={`${currentPath === '/tableau-de-bord' ? 'bg-primary text-white' : ''} flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:font-medium hover:bg-primary hover:text-white`}
        >
          <div className="grid mr-4 place-items-center">
            <PresentationChartBarIcon className="w-5" />
          </div>
          Accueil
        </a>
        <a
          href="/tableau-de-bord/animaux"
          className={`${currentPath === '/tableau-de-bord/animaux' ? 'bg-primary text-white' : ''} flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:font-medium hover:bg-primary hover:text-white`}
        >
          <div className="grid mr-4 place-items-center">
            <HeartIcon className="w-5" />
          </div>
          Animaux
        </a>
        <a
          href="/tableau-de-bord/familles"
          className={`${currentPath === '/tableau-de-bord/familles' ? 'bg-primary text-white' : ''} flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:font-medium hover:bg-primary hover:text-white`}
        >
          <div className="grid mr-4 place-items-center">
            <HomeIcon className="w-5" />
          </div>
          Familles
        </a>
        {user.role === 'admin' && (
          <a
            href="/tableau-de-bord/utilisateurs"
            className={`${currentPath === '/tableau-de-bord/utilisateurs' ? 'bg-primary text-white' : ''} flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:font-medium hover:bg-primary hover:text-white`}
          >
            <div className="grid mr-4 place-items-center">
              <UsersIcon className="w-5" />
            </div>
            Utilisateurs
          </a>
        )}
      </nav>
    </div>
  )
}
