import { NavLink } from "react-router-dom"

const links = [
  { to: "/overview",        label: "Overview",         icon: "⬡" },
  { to: "/services",        label: "Services",         icon: "⚡" },
  { to: "/recommendations", label: "Recommandations",  icon: "◈" },
  { to: "/infrastructure",  label: "Infrastructure",   icon: "⬢" },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-surface border-r border-border flex flex-col z-10">
      <div className="px-6 py-5 border-b border-border">
        <span className="text-lg font-semibold text-white tracking-tight">CloudLens</span>
        <span className="ml-2 text-xs text-indigo-400 font-medium">demo</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-400 font-medium"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <p className="text-xs text-muted">TechCorp SAS</p>
        <p className="text-xs text-muted/60">Données démo</p>
      </div>
    </aside>
  )
}
