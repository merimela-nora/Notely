# 📝 Notely

**Notely** is a full-stack web application that allows users to create, manage, and organize their personal notes (also called entries). Designed with a clean interface and real-world feel, Notely focuses on user-friendly note-taking, secure authentication, and markdown support.

---

## 🚀 Features

### ✅ User Authentication
- Sign up with first name, last name, email, username, and password
- Login using email or username
- Protected routes and logout functionality

### 🗒️ Notes System
- Create notes with title, synopsis, and markdown content
- View notes in a clean card layout
- Edit and soft-delete notes (with restore option)
- Trash page to manage deleted notes
- Read notes with markdown rendered as HTML

### 👤 User Profile
- View and update profile information
- Upload and update avatar (stored via Cloudinary)
- Change password with validation
- Avatar fallback to initials

### 📦 API Endpoints
RESTful backend with routes like:
- `POST /api/auth/register`
- `POST /api/entries`
- `GET /api/entries/trash`
- `PATCH /api/entry/restore/:id`
- `PATCH /api/user` — update profile and avatar

---

## 🧩 Models

### User
- `id`, `firstName`, `lastName`, `email`, `username`, `password`, `avatar`, `dateJoined`, `lastProfileUpdate`, `isDeleted`

### Entry
- `id`, `title`, `synopsis`, `content`, `isDeleted`, `createdAt`, `updatedAt`

(One-to-many: One user → many entries)

---

## 🔐 Extras
- Protected dashboard layout
- Avatar + user greeting
- Markdown → HTML rendering
- Trash retention messaging
- Optional: Pinned notes, public/private toggle, bookmarks

---

## 📌 Notes
- "Note" and "Entry" mean the same thing.
- Deleted notes use `isDeleted: true`, not removed from DB.
- Images uploaded to Cloudinary.
- Built with React, Material UI, Prisma, PostgreSQL, Node.js.





---

