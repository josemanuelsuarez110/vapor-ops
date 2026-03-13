import { Terminal, CheckCircle2, Clock, GitCommit, ExternalLink } from "lucide-react"

export default function DeploymentsPage() {
  const deployments = [
    {
      id: "1",
      commit: "feat: add ai-ops-agent",
      sha: "7abc123",
      status: "SUCCESS",
      time: "2 hours ago",
      project: "vapor-ops-main"
    },
    {
      id: "2",
      commit: "fix: ssh connection timeout",
      sha: "4f92b8d",
      status: "FAILED",
      time: "5 hours ago",
      project: "backend-api"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold">Deployments</h1>
        <p className="text-white/50">History and status of your automated build pipelines.</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white/40">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deployment</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Runtime</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {deployments.map((dep) => (
                <tr key={dep.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {dep.status === "SUCCESS" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-rose-400" />
                      )}
                      <span className={dep.status === "SUCCESS" ? "text-emerald-400" : "text-rose-400"}>
                        {dep.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="font-medium text-white/90">{dep.commit}</p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <GitCommit className="w-3 h-3" />
                        <span className="font-mono">{dep.sha}</span>
                        <span>•</span>
                        <span>{dep.project}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">
                    {dep.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60 font-mono">
                    42s
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-white/40 hover:text-indigo-400 transition-colors">
                        <Terminal className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/40 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
