import { Animal } from '~/types/animal'

export default function AnimalCardItem({ animal }: { animal: Animal }) {
  return (
    <a
      key={animal.id}
      href={`/tableau-de-bord/animaux/detail/${animal.id}`}
      className="mx-4 flex items-center justify-between pb-3 pt-3 cursor-pointer hover:shadow-md hover:rounded-lg px-4 transition-all hover:scale-[1.02]"
    >
      <div className="flex items-center gap-x-3">
        <div>
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            {animal.name[0].toUpperCase() + animal.name.slice(1)}
          </h6>
          <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
            {animal.identificationNumber}
          </p>
        </div>
      </div>
      <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
        {animal.species[0].toUpperCase() + animal.species.slice(1)}
      </h6>
    </a>
  )
}
