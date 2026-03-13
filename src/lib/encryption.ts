import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY = scryptSync(process.env.ENCRYPTION_KEY || 'vapor-ops-default-key-32-chars-!!', 'salt', 32)

export function encrypt(text: string) {
  const iv = randomBytes(16)
  const cipher = createCipheriv(ALGORITHM, KEY, iv)
  
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    content: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  }
}

export function decrypt(encrypted: { content: string, iv: string, tag: string }) {
  const decipher = createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex')
  )
  
  decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'))
  
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, 'hex')),
    decipher.final()
  ])

  return decrypted.toString('utf8')
}
