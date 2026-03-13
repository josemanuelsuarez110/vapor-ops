"use client"

import { useState } from "react"
import { Terminal, Lightbulb, AlertCircle, Loader2, Sparkles, RefreshCw } from "lucide-react"

export default function LogDiagnostics() {
  const [logs, setLogs] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const sampleLogs = [
    "Error: ECONNREFUSED 127.0.0.1:5432\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)",
    "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory",
    "Error: Cannot find module 'express'\nRequire stack:\n- /app/index.js"
  ]

  async function handleAnalyze() {
    setAnalyzing(true)
    // Simulating API call to AIOpsEngine.analyzeLogs
    setTimeout(() => {
      let result = "The deployment logs look stable, but no specific errors were detected for auto-fixing."
      if (logs.includes("ECONNREFUSED")) result = "Network Error: The application could not reach a defined service (Database/Redis). Suggestion: Check the environment variables and network alias in your Docker config."
      if (logs.includes("out of memory")) result = "Critical: Memory exhaustion detected. Suggestion: Increase the memory limit in your docker-compose.yml or check for memory leaks."
      if (logs.includes("Cannot find module")) result = "Dependency Error: A required package is missing. Suggestion: Verify that all dependencies are listed in your package.json and that the Dockerfile is running the install command correctly."
      
      setSuggestion(result)
      setAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          Live Logs & AI Debugger
        </h3>
        <div className="flex gap-2">
          {sampleLogs.map((s, i) => (
            <button 
              key={i}
              onClick={() => { setLogs(s); setSuggestion(null); }}
              className="text-[10px] glass px-2 py-1 rounded hover:bg-white/10 transition-colors uppercase tracking-wider text-white/40"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative group">
            <textarea 
              value={logs}
              onChange={(e) => { setLogs(e.target.value); setSuggestion(null); }}
              placeholder="Paste deployment logs here for AI diagnosis..."
              className="w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-xs text-white/70 focus:border-indigo-500 transition-colors outline-none resize-none"
            />
            <button 
              onClick={handleAnalyze}
              disabled={analyzing || !logs}
              className="absolute bottom-6 right-6 btn-primary flex items-center gap-2 py-2 px-4 text-sm disabled:opacity-50"
            >
              {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Analyze with AI
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className={cn(
            "h-64 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500",
            suggestion ? "glass bg-indigo-500/5 border-indigo-500/20" : "glass border-dashed border-white/10"
          )}>
            {!suggestion && !analyzing && (
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-full inline-block">
                  <Lightbulb className="w-10 h-10 text-white/20" />
                </div>
                <div className="max-w-xs space-y-2">
                  <h4 className="font-semibold text-lg text-white/60">Awaiting Logs</h4>
                  <p className="text-white/30 text-xs">
                    Paste deployment logs on the left to activate the AI Ops Agent for real-time diagnosis.
                  </p>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="space-y-4">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                <p className="text-indigo-400 font-medium animate-pulse">Consulting AI Knowledge Base...</p>
              </div>
            )}

            {suggestion && (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-indigo-500/20 rounded-full inline-block">
                  <AlertCircle className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-xl">AI Diagnosis</h4>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-left max-w-sm leading-relaxed">
                    <p className="text-white/80">{suggestion}</p>
                  </div>
                  <button className="text-indigo-400 text-xs font-bold uppercase tracking-widest hover:text-indigo-300 transition-colors flex items-center gap-2 justify-center w-full">
                    Apply Automated Fix
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
