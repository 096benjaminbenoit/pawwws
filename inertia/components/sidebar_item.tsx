import { Link } from '@inertiajs/react'
import { ReactNode } from 'react'

export default function SidebarItem({
  url,
  children,
  title,
}: {
  url: string
  children: ReactNode
  title: string
}) {
  const currentUrl = new URL(window.location.href)
  const currentPath = currentUrl.pathname
  return (
    <li>
      <Link
        href={url}
        className={`flex items-center p-2 rounded-lg transition-all hover:bg-gray-700 hover:text-primary ${currentPath.startsWith(url) ? 'bg-gray-700 text-primary' : 'text-white'}`}
      >
        {children}
        <span className="flex-1 ms-3 whitespace-nowrap text-white">{title}</span>
      </Link>
    </li>
  )
}
