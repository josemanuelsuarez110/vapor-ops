"use server"

import { auth } from "@/lib/auth"
import { SSHBridge } from "@/lib/ssh"
import { encrypt } from "@/lib/encryption"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"


export async function addServer(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const ip = formData.get("ip") as string
  const username = formData.get("username") as string
  const privateKey = formData.get("privateKey") as string

  // 1. Encrypt sensitive private key
  const encryptedKey = encrypt(privateKey)
  
  // 2. Initial Connection Test
  const ssh = new SSHBridge({
    host: ip,
    username,
    privateKey
  })

  try {
    const isDockerInstalled = await ssh.checkDockerInstallation()
    const isComposeInstalled = await ssh.checkDockerCompose()
    
    // 3. Save to DB
    const server = await prisma.server.create({
      data: {
        name,
        ip,
        status: isDockerInstalled && isComposeInstalled ? "READY" : "DOCKER_MISSING",
        // We'll store the encrypted pieces as a JSON string for now
        sshKeyId: JSON.stringify(encryptedKey)
      }
    })

    revalidatePath("/servers")
    return { success: true, server }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
