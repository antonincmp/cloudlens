import { useEffect, useState } from "react"
import { fetchCosts } from "../api"

function TrendBadge({ pct }) {
  if (pct > 20)  return <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400">+{pct.toFixed(1)}%</span>
  if (pct < 0)   return <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400">{pct.toFixed(1)}%</span>
  return               <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-muted">{pct > 0 ? "+" : ""}{pct.toFixed(1)}%</span>
}

export default function Services() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetchCosts().then(data => {
      const months  = data.months
      const current = months[months.length - 1]
      const prev    = months[months.length - 2]

      const services = Object.keys(current.services).map(name => {
        const curr = current.services[name] || 0
        const p    = prev.services[name]    || 0
        const pct  = p ? ((curr - p) / p) * 100 : 0
        return { name, current: curr, previous: p, pct }
      })
      services.sort((a, b) => b.current - a.current)
      setRows(services)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Services</h1>
        <p className="text-sm text-muted mt-1">Comparaison mois en cours vs mois précédent</p>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-xs uppercase tracking-wide">
              <th className="text-left px-5 py-3">Service</th>
              <th className="text-right px-5 py-3">Ce mois</th>
              <th className="text-right px-5 py-3">Mois précédent</th>
              <th className="text-right px-5 py-3">Variation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors ${i === rows.length - 1 ? "border-0" : ""}`}>
                <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                <td className="px-5 py-3 text-right text-white">{r.current.toFixed(2)}€</td>
                <td className="px-5 py-3 text-right text-muted">{r.previous.toFixed(2)}€</td>
                <td className="px-5 py-3 text-right"><TrendBadge pct={r.pct} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
