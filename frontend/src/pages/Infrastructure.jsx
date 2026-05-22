import { useEffect, useState } from "react"
import { fetchResources } from "../api"

const MODULE_COLORS = {
  s3_cloudfront: "text-sky-400    bg-sky-500/10",
  dynamodb:      "text-purple-400 bg-purple-500/10",
  iam:           "text-amber-400  bg-amber-500/10",
  lambda:        "text-orange-400 bg-orange-500/10",
  api_gateway:   "text-emerald-400 bg-emerald-500/10",
}

export default function Infrastructure() {
  const [data, setData] = useState(null)

  useEffect(() => { fetchResources().then(setData) }, [])

  if (!data) return <p className="text-muted">Chargement...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Infrastructure</h1>
          <p className="text-sm text-muted mt-1">{data.total} ressources déployées via Terraform</p>
        </div>
        <a
          href="https://github.com/antonincmp/cloudlens"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-muted hover:text-white border border-border px-3 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Voir le repo
        </a>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-xs uppercase tracking-wide">
              <th className="text-left px-5 py-3">Ressource</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Module</th>
              <th className="text-left px-5 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {data.resources.map((r, i) => (
              <tr key={i} className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors ${i === data.resources.length - 1 ? "border-0" : ""}`}>
                <td className="px-5 py-3 font-mono text-xs text-white/80">{r.name}</td>
                <td className="px-5 py-3 text-muted">{r.type}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${MODULE_COLORS[r.module] || "text-muted bg-white/5"}`}>
                    {r.module}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
