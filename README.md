# Spotify Backend API

This repository contains the backend code for a Spotify-like application, built using **Node.js**, **Express**, **MongoDB**, and **Clerk** for user authentication. The API supports features like user authentication, song and playlist management, and more.

---

## Features

- **User Authentication**: Secure login and registration using Clerk.
- **Song Management**: Upload, update, delete, and fetch songs with metadata.
- **Playlist Management**: Manage playlists with CRUD operations.
- **Cloud Integration**: File uploads (e.g., song audio files and images) via Cloudinary.
- **Scalable Design**: Handles large user bases and extensive song libraries.

---

## Tech Stack

- **Node.js**: Runtime for server-side JavaScript.
- **Express**: Framework for RESTful API development.
- **MongoDB**: NoSQL database for storing user and music data.
- **Clerk**: Authentication and user management service.
- **Cloudinary**: For media file storage (optional).

---

## Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud like Atlas)
- **Clerk Account**
- **Cloudinary Account** (optional)

### Steps to Install

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/spotify-backend.git
   cd spotify-backend
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Set up environment variables:
Create a .env file in the root directory with the following:
```
   PORT=5000
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>
  CLERK_API_KEY=your-clerk-api-key
  CLERK_FRONTEND_API=your-clerk-frontend-api
  CLERK_JWT_KEY=your-clerk-jwt-key
  CLOUDINARY_NAME=your-cloudinary-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```
4. Start the development server:
   ```bash
   npm run dev
---
## Folder structure
```   
spotify-backend/
├── src/
│   ├── controllers/       # API controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Authentication middleware
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── server.js              # Application entry point
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

