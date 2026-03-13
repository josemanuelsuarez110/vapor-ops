import { Rocket, Server, Activity, Plus } from "lucide-react"
import RepositoryAnalyzer from "@/components/dashboard/RepositoryAnalyzer"
import LogDiagnostics from "@/components/dashboard/LogDiagnostics"



export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-white/50">Manage your projects and infrastructure.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Rocket className="w-24 h-24" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-semibold text-white/90">Total Deployments</span>
            </div>
            <p className="text-4xl font-bold italic">0</p>
            <p className="text-sm text-emerald-400/80">All systems operational</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Server className="w-24 h-24" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Server className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="font-semibold text-white/90">Active Servers</span>
            </div>
            <p className="text-4xl font-bold italic">0</p>
            <p className="text-sm text-white/40">Connect your first VPS</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-colors cursor-pointer group">
          <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
            <Plus className="w-8 h-8 text-white/40 group-hover:text-white/100 transition-colors" />
          </div>
          <span className="text-white/40 font-medium group-hover:text-white/100 transition-colors">Quick Connect Server</span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white/50">Infrastructure Logs</h2>
        <LogDiagnostics />
      </div>
    </div>
  )
}
