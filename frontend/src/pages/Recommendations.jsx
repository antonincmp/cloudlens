import { useEffect, useState } from "react"
import { fetchRecommendations } from "../api"

const SEVERITY = {
  critical: { label: "Critique", color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    dot: "bg-red-400" },
  warning:  { label: "Attention", color: "text-amber-400", bg: "bg-amber-500/10",  border: "border-amber-500/20",  dot: "bg-amber-400" },
  info:     { label: "Info",      color: "text-blue-400",  bg: "bg-blue-500/10",   border: "border-blue-500/20",   dot: "bg-blue-400" },
}

function RecCard({ rec }) {
  const s = SEVERITY[rec.severity] || SEVERITY.info
  return (
    <div className={`bg-surface border ${s.border} rounded-xl p-5 space-y-3`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
          <span className={`text-xs font-medium ${s.color}`}>{s.label}</span>
          <span className="text-xs text-muted">· {rec.resource_type}</span>
        </div>
        {rec.savings > 0 && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            -{rec.savings}€/mois
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-white">{rec.title}</p>
      <p className="text-xs text-muted leading-relaxed">{rec.description}</p>
      <div className={`text-xs ${s.color} ${s.bg} rounded-lg px-3 py-2`}>
        → {rec.action}
      </div>
    </div>
  )
}

export default function Recommendations() {
  const [data, setData] = useState(null)

  useEffect(() => { fetchRecommendations().then(setData) }, [])

  if (!data) return <p className="text-muted">Chargement...</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Recommandations</h1>
        <p className="text-sm text-muted mt-1">{data.recommendations.length} points d'optimisation détectés</p>
      </div>

      <div className="space-y-3">
        {data.recommendations.map(r => <RecCard key={r.id} rec={r} />)}
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Économies totales potentielles</p>
          <p className="text-xs text-muted mt-0.5">En appliquant toutes les recommandations</p>
        </div>
        <p className="text-2xl font-bold text-emerald-400">{data.total_savings}€<span className="text-sm font-normal text-muted">/mois</span></p>
      </div>
    </div>
  )
}
