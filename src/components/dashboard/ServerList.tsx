"use client"

import { Server, Terminal, Activity, CheckCircle, XCircle } from "lucide-react"

interface ServerProps {
  id: string
  name: string
  ip: string
  status: string
}

export default function ServerList({ servers }: { servers: ServerProps[] }) {
  if (servers.length === 0) return null

  return (
    <div className="space-y-4">
      {servers.map((server) => (
        <div key={server.id} className="glass p-6 rounded-2xl flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              server.status === "READY" ? "bg-emerald-500/10" : "bg-yellow-500/10"
            )}>
              <Server className={cn(
                "w-5 h-5",
                server.status === "READY" ? "text-emerald-400" : "text-yellow-400"
              )} />
            </div>
            <div>
              <h3 className="font-semibold">{server.name}</h3>
              <p className="text-white/40 text-sm font-mono">{server.ip}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              {server.status === "READY" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-yellow-400" />
              )}
              <span className={server.status === "READY" ? "text-emerald-400" : "text-yellow-400"}>
                {server.status}
              </span>
            </div>
            
            <button className="p-2 text-white/40 hover:text-white transition-colors glass px-4 rounded-lg flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Console
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
