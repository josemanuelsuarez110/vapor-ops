import { Client } from 'ssh2'

export interface SSHConfig {
  host: string
  port?: number
  username: string
  privateKey: string
}

export interface SSHResult {
  stdout: string
  stderr: string
  code: number
}

export class SSHBridge {
  private config: SSHConfig

  constructor(config: SSHConfig) {
    this.config = {
      port: 22,
      ...config,
    }
  }

  async executeCommand(command: string): Promise<SSHResult> {
    return new Promise((resolve, reject) => {
      const conn = new Client()
      let stdout = ''
      let stderr = ''

      conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            conn.end()
            return reject(err)
          }

          stream.on('close', (code: number) => {
            conn.end()
            resolve({ stdout, stderr, code })
          }).on('data', (data: Buffer) => {
            stdout += data.toString()
          }).stderr.on('data', (data: Buffer) => {
            stderr += data.toString()
          })
        })
      }).on('error', (err) => {
        conn.end() // Shared error handler should close connection
        reject(err)
      }).connect({
        host: this.config.host,
        port: this.config.port,
        username: this.config.username,
        privateKey: this.config.privateKey
      })
    })
  }

  async checkDockerInstallation(): Promise<boolean> {
    try {
      const result = await this.executeCommand('docker --version')
      return result.code === 0
    } catch {
      return false
    }
  }

  async checkDockerCompose(): Promise<boolean> {
    try {
      const result = await this.executeCommand('docker compose version')
      return result.code === 0
    } catch {
      return false
    }
  }
}
