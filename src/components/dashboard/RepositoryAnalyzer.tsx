"use client"

import { useState } from "react"
import { Github, Search, Loader2, Sparkles, FileCode, CheckCircle2 } from "lucide-react"
import { analyzeRepository } from "@/actions/ai-actions"

export default function RepositoryAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [repo, setRepo] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)

  async function handleAnalyze() {
    if (!repo.includes("/")) return
    setLoading(true)
    const [owner, name] = repo.split("/")
    const result = await analyzeRepository(owner, name)
    
    if (result.success) {
      setAnalysis(result.analysis)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="glass p-6 rounded-2xl flex items-center gap-4">
        <div className="flex-1 relative">
          <Github className="absolute left-3 top-3 w-5 h-5 text-white/30" />
          <input 
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="owner/repository"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 focus:border-indigo-500 transition-colors outline-none"
          />
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={loading || !repo.includes("/")}
          className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Analyze Stack
        </button>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Analysis
            </h3>
            <div className="glass p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-white/60">Language</span>
                <span className="font-mono text-indigo-400">{analysis.language}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-white/60">Framework</span>
                <span className="font-mono text-emerald-400">{analysis.framework}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Optimized Docker configuration ready
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400" />
              Generated Config
            </h3>
            <div className="glass-hover bg-black/40 p-6 rounded-2xl border border-white/10 relative group">
              <div className="absolute top-4 right-4 p-2 bg-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[10px] text-indigo-400 font-bold">COPY</span>
              </div>
              <pre className="text-xs font-mono text-white/70 overflow-x-auto">
                {analysis.suggestedDockerfile}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
