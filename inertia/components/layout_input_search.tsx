import { useState, useEffect } from 'react'

export default function LayoutInputSearch({ query, setQuery }: { query: string; setQuery: any }) {
  const [localQuery, setLocalQuery] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(localQuery)
    }, 200)

    return () => {
      clearTimeout(handler)
    }
  }, [localQuery, setQuery])

  return (
    <input
      autoFocus
      type="search"
      name="query"
      className="border ps-10 pe-3 py-2 rounded-lg w-full border-gray-300"
      placeholder="Rechercher ..."
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
    />
  )
}
