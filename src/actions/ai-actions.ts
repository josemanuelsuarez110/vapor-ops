"use server"

import { AIOpsEngine } from "@/lib/ai-engine"
import { auth } from "@/lib/auth"

export async function analyzeRepository(owner: string, repo: string) {
  const session = await auth()
  // In a real app, we'd use the session to get the user's GitHub token
  // For the MVP, we assume a token is provided or we use a system one if configured
  const token = process.env.GITHUB_TOKEN || "" 
  
  if (!token) {
    return { 
      success: false, 
      error: "GitHub token not configured. Please add GITHUB_TOKEN to .env" 
    }
  }

  const engine = new AIOpsEngine(token)
  
  try {
    const analysis = await engine.analyzeRepository(owner, repo)
    return { success: true, analysis }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
