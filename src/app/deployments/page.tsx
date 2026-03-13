import { Terminal, CheckCircle2, Clock, GitCommit, ExternalLink, Activity } from "lucide-react"
import LogStream from "@/components/dashboard/LogStream"

export default function DeploymentsPage() {
  const deployments = [
    {
      id: "1",
      commit: "feat: add ai-ops-agent",
      sha: "7abc123",
      status: "SUCCESS",
      time: "2 mins ago",
      server: "Production-Web-01"
    },
    {
      id: "2",
      commit: "fix: resolve prisma connection",
      sha: "8def456",
      status: "FAILED",
      time: "1 hour ago",
      server: "Production-Web-01"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Deployment History</h1>
        <div className="flex items-center space-x-2 text-sm text-cyan-400/80 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
          <Activity size={14} className="animate-pulse" />
          <span>AIOps Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <Clock size={18} className="text-zinc-400" />
            <span>Recent Activity</span>
          </h2>
          {deployments.map((dep) => (
            <div key={dep.id} className="glass p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all group bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${dep.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_8px_rgba(34,197,94,0.5)]`} />
                  <div>
                    <div className="font-medium group-hover:text-cyan-400 transition-colors">{dep.commit}</div>
                    <div className="text-xs text-zinc-500 flex items-center space-x-2 mt-1">
                      <GitCommit size={12} />
                      <span className="font-mono">{dep.sha}</span>
                      <span>•</span>
                      <span>{dep.server}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">{dep.time}</div>
                  <button className="text-[10px] mt-2 text-zinc-500 hover:text-white flex items-center space-x-1 ml-auto">
                    <span>Details</span>
                    <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <Terminal size={18} className="text-zinc-400" />
            <span>Live Analysis</span>
          </h2>
          <LogStream deploymentId="mock-deploy" />
          <div className="glass p-4 rounded-2xl border border-white/5 bg-cyan-950/20">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">AI Insights</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              No anomalies detected in the current stream. The deployment flow is following standard optimized patterns for Next.js applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
