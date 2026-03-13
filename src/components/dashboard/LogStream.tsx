"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, ChevronRight, Loader2 } from "lucide-react"

interface LogStreamProps {
  deploymentId: string
}

export default function LogStream({ deploymentId }: LogStreamProps) {
  const [logs, setLogs] = useState<{ message: string; timestamp: string }[]>([])
  const [status, setStatus] = useState<"idle" | "streaming" | "completed" | "error">("idle")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const startStreaming = () => {
    setLogs([])
    setStatus("streaming")
    
    const eventSource = new EventSource(`/api/deploy/stream?deploymentId=${deploymentId}`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setLogs((prev) => [...prev, data])
    }

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err)
      eventSource.close()
      setStatus("completed") // Mock ends naturally here
    }

    return () => {
      eventSource.close()
    }
  }

  return (
    <div className="glass rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <Terminal size={14} />
          <span>REAL-TIME DEPLOYMENT LOGS</span>
        </div>
        {status === "idle" && (
          <button 
            onClick={startStreaming}
            className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded hover:bg-cyan-500/30 transition-colors"
          >
            Start Stream
          </button>
        )}
        {status === "streaming" && (
          <div className="flex items-center space-x-2 text-xs text-orange-400">
            <Loader2 size={12} className="animate-spin" />
            <span>STREAMING...</span>
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-1 scrollbar-hide"
      >
        {logs.length === 0 && status === "idle" && (
          <div className="h-full flex items-center justify-center text-zinc-500 italic">
            Click 'Start Stream' to monitor deployment output
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex items-start space-x-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <ChevronRight size={14} className="mt-1 text-zinc-600 shrink-0" />
            <span className="text-zinc-500 opacity-50 text-[10px] tabular-nums mt-0.5 whitespace-nowrap">
              [{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
            </span>
            <span className={`${
              log.message.includes('✅') ? 'text-green-400 font-bold' : 
              log.message.includes('🚀') ? 'text-cyan-400' :
              log.message.includes('📦') ? 'text-amber-400' :
              'text-zinc-200'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
