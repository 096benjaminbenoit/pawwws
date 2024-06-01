import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Animal } from '~/types/animal'

export default function AnimalTableItem({ animal }: { animal: Animal }) {
  return (
    <tr key={animal.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
        {animal.identificationNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
        {animal.name[0].toUpperCase() + animal.name.slice(1)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
        {animal.species[0].toUpperCase() + animal.species.slice(1)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
        {animal.color[0].toUpperCase() + animal.color.slice(1)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none  "
        ></button>
        <Popover className="relative">
          <PopoverButton className="focus:outline-none">
            <EllipsisVerticalIcon className="w-6" />
          </PopoverButton>
          <PopoverPanel
            anchor="left"
            className="flex flex-col bg-white shadow-lg p-4 rounded-lg space-y-3 z-[100] border border-gray-200"
          >
            <a
              href={`/tableau-de-bord/animaux/detail/${animal.id}`}
              className="transition-all hover:font-medium"
            >
              Détail
            </a>
            <a href="#" className="transition-all hover:font-medium">
              Modifier
            </a>
            <form action="#" method="post">
              <button
                type="submit"
                className="hover:text-error transition-all ease-in-out hover:font-medium"
              >
                Supprimer
              </button>
            </form>
          </PopoverPanel>
        </Popover>
      </td>
    </tr>
  )
}
