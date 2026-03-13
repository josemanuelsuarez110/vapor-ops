import { Octokit } from "@octokit/rest"

export class AIOpsEngine {
  private octokit: Octokit

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token })
  }

  async analyzeRepository(owner: string, repo: string) {
    // 1. Fetch file structure
    const { data: files } = await this.octokit.repos.getContent({
      owner,
      repo,
      path: "",
    })

    const fileList = Array.isArray(files) ? files.map(f => f.name) : []
    
    // 2. Detect Tech Stack
    const stack = this.detectStack(fileList)
    
    // 3. Generate Optimized Backend Config (Simplified for MVP)
    const config = this.generateDockerConfig(stack.language, stack.framework)

    return {
      ...stack,
      ...config
    }
  }

  private detectStack(files: string[]) {
    if (files.includes("package.json")) {
      return { language: "JavaScript/TypeScript", framework: "Next.js/React" }
    }
    if (files.includes("requirements.txt") || files.includes("pyproject.toml")) {
      return { language: "Python", framework: "FastAPI/Django" }
    }
    if (files.includes("go.mod")) {
      return { language: "Go", framework: "Standard Library/Gin" }
    }
    return { language: "Unknown", framework: "Generic Container" }
  }

  private generateDockerConfig(language: string, framework: string) {
    return {
      suggestedDockerfile: `# Optimized Dockerfile for ${language}/${framework}\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
      suggestedCompose: `services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    restart: always`
    }
  }

  async analyzeLogs(logs: string): Promise<string> {
    if (logs.includes("OutOfMemoryError") || logs.includes("killed")) {
      return "Critical: Memory exhaustion detected. Suggestion: Increase the memory limit in your docker-compose.yml or check for memory leaks."
    }
    
    if (logs.includes("ECONNREFUSED") || logs.includes("Failed to connect")) {
      return "Network Error: The application could not reach a defined service (Database/Redis). Suggestion: Check the environment variables and network alias in your Docker config."
    }

    if (logs.includes("Module not found") || logs.includes("Cannot find module")) {
      return "Dependency Error: A required package is missing. Suggestion: Verify that all dependencies are listed in your package.json and that the Dockerfile is running the install command correctly."
    }

    return "The deployment logs look stable, but no specific errors were detected for auto-fixing."
  }
}
