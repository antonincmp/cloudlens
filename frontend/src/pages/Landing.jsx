import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-xs text-indigo-400 font-medium">Mode démo — TechCorp SAS</span>
        </div>

        <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
          Cloud<span className="text-indigo-400">Lens</span>
        </h1>

        <p className="text-lg text-muted mb-10">
          Visualisez et optimisez vos coûts AWS en un coup d'œil
        </p>

        <button
          onClick={() => navigate("/overview")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Voir la démo
        </button>
      </div>

      <div className="absolute bottom-8 text-xs text-muted/40">
        Déployé sur AWS · Terraform · GitHub Actions
      </div>
    </div>
  )
}
