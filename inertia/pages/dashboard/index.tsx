import { Head } from '@inertiajs/react'
import DashboardLayout from '~/layouts/dashboard_layout'

export default function Index() {
  return (
    <>
      <Head title="Tableau de bord" />
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl font-semibold text-dark">Welcome to dashboard</h1>
        </div>
      </DashboardLayout>
    </>
  )
}
