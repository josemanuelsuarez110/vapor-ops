import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const deploymentId = searchParams.get("deploymentId")

  if (!deploymentId) {
    return new Response("Missing deploymentId", { status: 400 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      // Mock streaming logic for demonstration
      const logs = [
        "🚀 Starting deployment...",
        "📦 Fetching repository...",
        "🔨 Building Docker images...",
        "🐳 Containerizing application...",
        "🛰️ Pushing to remote server...",
        "✅ Deployment successful!",
        "🔗 URL: https://vapor-ops-app.vercel.app"
      ]

      for (const log of logs) {
        // In a real app, this would be linked to the SSHBridge output
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ message: log, timestamp: new Date().toISOString() })}\n\n`))
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
