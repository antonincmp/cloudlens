import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { fetchCosts } from "../api"

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#64748b"]
const SERVICES = ["EC2", "RDS", "S3", "Lambda", "CloudFront", "Autres"]

function KpiCard({ label, value, sub, subColor = "text-muted" }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-xs text-muted uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
    </div>
  )
}

export default function Overview() {
  const [data, setData] = useState(null)

  useEffect(() => { fetchCosts().then(setData) }, [])

  if (!data) return <p className="text-muted">Chargement...</p>

  const months    = data.months
  const current   = months[months.length - 1]
  const previous  = months[months.length - 2]
  const variation = (((current.total - previous.total) / previous.total) * 100).toFixed(1)
  const isUp      = variation > 0

  const barData = months.map(m => ({ name: m.month.slice(5), total: Number(m.total.toFixed(2)) }))

  const pieData = SERVICES.map(s => ({
    name: s,
    value: Number((current.services[s] || 0).toFixed(2))
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Overview</h1>
        <p className="text-sm text-muted mt-1">TechCorp SAS — {current.month}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Coût du mois"
          value={`${current.total.toFixed(0)}€`}
          sub={`vs ${previous.total.toFixed(0)}€ le mois dernier`}
        />
        <KpiCard
          label="Variation"
          value={`${isUp ? "+" : ""}${variation}%`}
          sub={isUp ? "Hausse des coûts" : "Baisse des coûts"}
          subColor={isUp ? "text-red-400" : "text-emerald-400"}
        />
        <KpiCard
          label="Score FinOps"
          value="72/100"
          sub="3 points d'amélioration"
          subColor="text-amber-400"
        />
        <KpiCard
          label="Économies potentielles"
          value="88€/mois"
          sub="4 recommandations actives"
          subColor="text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <p className="text-sm font-medium text-white mb-4">Coûts des 6 derniers mois</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1a1d27", border: "1px solid #2a2d3e", borderRadius: 8 }}
                labelStyle={{ color: "#e2e8f0" }}
                formatter={v => [`${v}€`, "Total"]}
              />
              <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-sm font-medium text-white mb-4">Répartition par service</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1a1d27", border: "1px solid #2a2d3e", borderRadius: 8 }}
                formatter={v => [`${v}€`]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
