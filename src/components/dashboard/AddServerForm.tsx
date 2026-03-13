"use client"

import { useState } from "react"
import { Server, Shield, Globe, Terminal, Loader2 } from "lucide-react"
import { addServer } from "@/actions/server-actions"

export default function AddServerForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await addServer(formData)
    
    setStatus(result)
    setLoading(false)
  }

  return (
    <div className="glass p-8 rounded-3xl max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600 rounded-2xl">
          <Server className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Connect your VPS</h2>
          <p className="text-white/50 text-sm">VaporOps will connect via SSH to manage your containers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">Friendly Name</label>
            <div className="relative">
              <Server className="absolute left-3 top-3 w-4 h-4 text-white/30" />
              <input 
                name="name"
                placeholder="Production Server"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-indigo-500 transition-colors outline-none"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 ml-1">IP Address</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-white/30" />
              <input 
                name="ip"
                placeholder="1.2.3.4"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-indigo-500 transition-colors outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">SSH Username</label>
          <div className="relative">
            <Shield className="absolute left-3 top-3 w-4 h-4 text-white/30" />
            <input 
              name="username"
              placeholder="root"
              defaultValue="root"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-indigo-500 transition-colors outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">Private SSH Key</label>
          <div className="relative">
            <Terminal className="absolute left-3 top-3 w-4 h-4 text-white/30" />
            <textarea 
              name="privateKey"
              placeholder="-----BEGIN OPENSSH PRIVATE KEY-----..."
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 pl-10 focus:border-indigo-500 transition-colors outline-none font-mono text-xs"
              required
            />
          </div>
        </div>

        {status?.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
             ❌ Connection failed: {status.error}
          </div>
        )}

        {status?.success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">
             ✅ Server registered successfully!
          </div>
        )}

        <button 
          disabled={loading}
          className="w-full btn-primary py-3 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Connect Server</>
          )}
        </button>
      </form>
    </div>
  )
}
