import { NextResponse } from "next/server"
import { triggerDeployment } from "@/actions/deploy-actions"

export async function POST(req: Request) {
  const payload = await req.json()
  
  // Verify GitHub signature in a real app
  
  if (payload.ref === "refs/heads/main" || payload.ref === "refs/heads/master") {
    const repo = payload.repository.full_name
    const commitSha = payload.after
    
    console.log(`Webhook received: pushing ${repo} at ${commitSha}`)
    
    // In a real app, find project by repo name in DB
    await triggerDeployment("mock-project-id", commitSha)
  }

  return NextResponse.json({ received: true })
}
