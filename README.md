# 🚀 Deploying Node.js (Express) Application to Hostinger VPS using Docker & CI/CD

This guide explains how to create a simple Express server, dockerize it, deploy it on a Hostinger VPS, and automate deployment using GitHub Actions CI/CD.

---

## 1️⃣ Create a Simple Express Server

- Initialize a Node.js project
- Install Express
- Create a basic server (`index.js` / `server.js`)
- Test it locally to ensure it runs correctly

---

## 2️⃣ Dockerize the Application

### Create a `Dockerfile`

Configure the Dockerfile with:
- Base image (Node.js)
- Copy required files into the container
- Install dependencies
- Expose the application port
- Run command to start the server

Example steps:
- `FROM node`
- `WORKDIR /app`
- `COPY package*.json ./`
- `RUN npm install`
- `COPY . .`
- `EXPOSE 3000`
- `CMD ["node", "index.js"]`

---

## 3️⃣ Test the Dockerized App Locally

Build and run the Docker container:

```bash
docker build -t simple-backend .
docker run -p 3000:3000 simple-backend
```

## 4️⃣ Buy a VPS from Hostinger & Configure It

- After confirming the app works:
- Purchase a Hostinger VPS (KVM)
- SSH into the server
- Install required tools:
- Git
- Docker
- Docker Compose

---

## 5️⃣ Create docker-compose.yml
- Docker Compose helps automate Docker commands.
- Create a docker-compose.yml file so you can run:
- docker compose up -d --build
- This will:
- Build the image
- Run containers in detached mode
- Restart the app automatically on updates

---

## 6️⃣⚙️ CI/CD Pipeline with GitHub Actions, Create Workflow Folder & File

- Inside the project root directory, create: .github/workflows/deploy.yml
- This is the default path used by GitHub Actions to configure CI/CD pipelines.

## 7️⃣ GitHub Actions Workflow Configuration

Add the following code to deploy.yml and update values according to your system setup:
```sh
name: Deploying Node js application to Hostinger

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy Via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: root
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /root/simple-backend
            git pull
            docker compose up -d --build
```

## 🔐 SSH Configuration
- What are SSH_HOST and SSH_KEY?
---
- These secrets are required to establish a secure SSH handshake between GitHub and your VPS so that code changes are automatically deployed.

- SSH_HOST: This is your VPS hostname or IP address

```sh
How to add it:
Go to GitHub → Your Repository

Open Settings

Navigate to Secrets and variables → Actions

Click New repository secret

Add:

Name: SSH_HOST

Value: your VPS IP / hostname

SSH_KEY

This is your private SSH key

It allows GitHub Actions to securely access your VPS

Generate SSH Keys

Run this command in your local terminal:

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"


This generates:

id_rsa → Private key

id_rsa.pub → Public key

Configure SSH Keys
Add Public Key to VPS

Copy id_rsa.pub and paste it into the VPS:

nano ~/.ssh/authorized_keys

Add Private Key to GitHub

Copy the contents of id_rsa and add it as a GitHub secret:

Name: SSH_KEY

Value: private key content
```

## ✅ Final Step

- Push your code to GitHub:
```sh
git add .
git commit -m "setup ci/cd deployment"
git push origin main
```

GitHub Actions will trigger automatically and deploy the latest code to your Hostinger VPS without manual intervention.