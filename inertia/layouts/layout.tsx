import { router, usePage } from '@inertiajs/react'
import { ReactNode, useEffect, useState } from 'react'
import Navbar from '~/components/navbar'
import SideBar from '~/components/sidebar'
import { User } from '~/types/user'

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user } = usePage().props
  const [query, setQuery] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    if (query.length) {
      url.searchParams.set('search', query)
      url.searchParams.delete('page')
    } else {
      url.searchParams.delete('search')
    }
    router.visit(url.toString(), { preserveState: true })
  }, [query])

  return (
    <>
      <SideBar user={user as User} isOpen={isOpen} />
      <Navbar
        user={user as User}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        query={query}
        setQuery={setQuery}
      />
      <main className="absolute h-[calc(100vh-64px)] w-full md:w-[calc(100vw-17rem)] right-0 bottom-0 p-4">
        {children}
      </main>
    </>
  )
}
