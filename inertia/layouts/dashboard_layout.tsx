import Header from '~/components/header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  )
}
