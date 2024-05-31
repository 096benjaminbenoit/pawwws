import { Head } from '@inertiajs/react'
import DashboardLayout from '~/layouts/dashboard_layout'

export default function Families() {
  return (
    <>
      <Head title="Familles" />
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl font-semibold text-dark">Welcome to families page</h1>
        </div>
      </DashboardLayout>
    </>
  )
}
