export default function AnimalCardSkeleton() {
  return (
    <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-all animate-pulse">
      <h5 className="mb-2 text-2xl font-bold tracking-tight w-1/4 h-3 bg-gray-200 rounded-full"></h5>
      <p className="font-normal my-4 h-2 bg-gray-200 rounded-full w-2/4"></p>
      <p className="font-normal h-2 bg-gray-200 w-3/4 rounded-full"></p>
    </div>
  )
}
