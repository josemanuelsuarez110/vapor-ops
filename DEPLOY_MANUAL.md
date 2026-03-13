# VaporOps: Manual Deployment Guide

Since the automated push is encountering a 403 Forbidden error (possibly due to PAT scopes or environment restrictions), please follow these steps to deploy VaporOps to your server.

## 1. Upload to GitHub
Open your terminal inside the `vapor-ops` folder and run:

```bash
# Add the remote if not already added
git remote add origin https://github.com/josemanuelsuarez110/vapor-ops.git

# Push the master branch
git push -u origin master
```

## 2. Server Configuration
Once the code is on GitHub, we need to prepare the server. Note that you need:
- A VPS with Docker and Docker Compose installed.
- Port 3000 (VaporOps Dashboard) and Port 80/443 (for your apps) open.

## 3. Deploy Command
Run this on your VPS to start VaporOps:

```bash
git clone https://github.com/josemanuelsuarez110/vapor-ops.git
cd vapor-ops
docker compose up -d
```

## 🔐 Environment Variables
Make sure to create a `.env` file on your server with the following:

- `GITHUB_ID`: Your GitHub OAuth App ID
- `GITHUB_SECRET`: Your GitHub OAuth App Secret
- `NEXTAUTH_SECRET`: A random secure string
- `ENCRYPTION_KEY`: A 32-character string for SSH security
- `GITHUB_TOKEN`: The PAT you generated (for the auto-stack detection)
