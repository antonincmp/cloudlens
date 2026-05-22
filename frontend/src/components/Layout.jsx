import Sidebar from "./Sidebar"

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-56 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
