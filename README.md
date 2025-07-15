<p align="center">
  <img src="https://build-a-squad.s3.ap-south-1.amazonaws.com/buildasquad_logo.png" alt="BuildASquad Logo" height="200"/>
</p>

# 🚀 BuildASquad Frontend

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://buildasquad.vercel.app/)
    <img src="https://img.shields.io/github/last-commit/SachiPatankar/buildasquad?style=default&logo=git&logoColor=white&color=ff781a" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/SachiPatankar/buildasquad?style=default&color=ff781a" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/SachiPatankar/buildasquad?style=default&color=ff781a" alt="repo-language-count">

> A sleek, real-time website for connecting and collaborating with project squads. Post, apply, chat, manage — all in one place. This repository is the frontend of this project.

---

🔗 **Table of Contents**
- 📍 [Overview](#project-overview)
- 🛠️ [Tech Stack](#tech-stack-overview)
- 📂 [Folder Structure](#folder-structure)
- 🌐 [State Management](#state-management)
- 🔄 [Real-Time Features](#real-time-features)
- 🔌 [API Communication](#api-communication)
- 🚀 [Setup Instructions](#setup-instructions)
- 🛳️ [Deployment](#deployment)
- 🧑‍💻 [Contributing](#contributing-guidelines)

---

## 📍 Project Overview

**BuildASquad** is a platform that empowers individuals to discover and collaborate on projects. With this frontend, users can:
- 🧑‍💻 Post and manage projects
- ✉️ Apply to join existing squads
- 🔍 Discover people and projects with filters
- 💬 Chat in real-time with teammates
- 📬 Receive notifications and manage connections

---

## 🛠️ Tech Stack Overview

- ⚡ **Vite** – Lightning-fast development and build tool  
- ⚛️ **React** – UI library for building interactive interfaces  
- 🟦 **TypeScript** – Type-safe, scalable JavaScript  
- 🌊 **Zustand** – Minimalist state management  
- 🎨 **TailwindCSS** – Utility-first styling framework  
- 🧩 **shadcn/ui** – Customizable UI built on Radix + Tailwind  
- 📡 **Socket.IO** – Real-time communication  
- 🚀 **Apollo Client** – GraphQL client with caching

---

## 📂 Folder Structure

src/  
├── app/ # Pages (Home, Chat, Auth, etc.)  
├── components/ # Reusable UI (shadcn + custom)  
├── api/ # Axios instance & REST handlers  
├── graphql/ # Apollo client + queries/mutations  
├── stores/ # Zustand stores  
├── hooks/ # Custom hooks (e.g., useSocket)  
├── lib/ # Utilities (socket client, helpers)  
├── assets/ # Static files  
├── index.css # Tailwind and global styles  
└── main.tsx # Entry point  

---

## 🌐 State Management

- 🧠 **Zustand** manages:
  - Authentication (`userAuthStore.ts`)
  - Notifications (`notificationStore.ts`)
- 🔐 Auth is restored on load from storage, and tokens are refreshed as needed.
- 🧰 **Interceptors** in `api/api.ts` handle token injection and 401 errors.
- 🚫 Protected routes are guarded via the `ProtectedRoute` component.

---

## 🔄 Real-Time Features

- ⚡ **Socket.IO Client** (`lib/socket.ts`)
- 🔌 `useSocket` hook connects sockets and binds events.
- 💬 Enables:
  - Real-time chat (rooms, messages)
  - Live notifications (counts, friend requests)

---

## 🔌 API Communication

- 📡 **GraphQL** via Apollo Client for core data flows.
- 🔐 **REST** for authentication (login/signup/refresh).
- 🧬 **Codegen** (`codegen.yml`) ensures typed GraphQL hooks.

---

## 🚀 Setup Instructions

1. **Clone the repo**:
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```
   VITE_API_URL=https://your-backend-api-url
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

---

## 🛳️ Deployment

🌐 Hosted on **Vercel** : https://buildasquad.vercel.app/

To create a production build:
```bash
npm run build
npm run preview
```

---

## 🙌 Contributing Guidelines

- ✨ Use `feature/`, `fix/`, or `chore/` prefixes for branches.
- ✅ Ensure PRs pass all lint and build checks.
- 💬 Write clear, descriptive commit messages.
- 🎯 Follow ESLint + Prettier formatting.
- 🧪 Add tests where possible for new components/features.

---

## 📄 License

This project is licensed under the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) license.  
You may use, remix, and share the code for **non-commercial** purposes with proper credit.

---

## 🙏 Acknowledgments

Shoutout to:
- Open-source tools and libraries used
- Inspiration from platforms like **Devfolio**, **ProductHunt**, and **GitHub Explore**