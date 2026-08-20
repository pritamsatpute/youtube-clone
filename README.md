# YouTube Clone - MERN Stack Project

A full-stack YouTube clone built using the **MERN Stack: MongoDB,
Express.js, React, and Node.js**.

This project recreates the core YouTube experience with user
authentication, video browsing, search, category filtering, video
playback, likes, dislikes, comments, channels, video management,
subscriptions, watch history, notifications, and responsive design.

------------------------------------------------------------------------

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [Available Scripts](#available-scripts)
-   [Authentication](#authentication)
-   [API Overview](#api-overview)
-   [Database](#database)
-   [File Uploads](#file-uploads)
-   [Responsive Design](#responsive-design)
-   [Testing](#testing)
-   [Security Notes](#security-notes)
-   [Project Links](#project-links)

------------------------------------------------------------------------

# Project Overview

The YouTube Clone is a full-stack web application developed using the
MERN stack.

The project provides a YouTube-style platform where users can:

-   Create an account
-   Log in securely
-   Browse videos
-   Search videos by title
-   Filter videos by category
-   Watch videos
-   Like and dislike videos
-   Add, edit, and delete comments
-   Like comments
-   Create a channel
-   Upload videos
-   Edit uploaded videos
-   Delete uploaded videos
-   Subscribe to channels
-   Unsubscribe from channels
-   View subscription content
-   View watch history
-   Manage watch history
-   View liked videos
-   Receive notifications
-   Switch between light and dark themes
-   Use the application on desktop, tablet, and mobile devices

The application consists of:

``` text
Frontend
React + Vite

Backend
Node.js + Express.js

Database
MongoDB + Mongoose

Authentication
JWT + bcryptjs
```

------------------------------------------------------------------------

# Features

## Authentication

-   User registration
-   User login
-   JWT-based authentication
-   Protected routes
-   Guest-only routes
-   Authentication persistence
-   Logout
-   Current-user authentication
-   Form validation
-   Password hashing using bcryptjs
-   Authorization middleware

## Home Page

-   YouTube-style header
-   Hamburger menu
-   Toggleable sidebar
-   Search bar
-   Category filter buttons
-   Responsive video grid
-   Video thumbnails
-   Video titles
-   Channel names
-   View counts
-   Upload dates
-   Loading states
-   Error handling

## Search

-   Search from the header
-   Search results page
-   Search videos by title
-   Case-insensitive title matching
-   Responsive search results

## Category Filters

The application supports multiple categories, including:

-   All
-   Music
-   Gaming
-   News
-   Live
-   Podcasts
-   Cricket
-   JavaScript
-   React
-   Node.js
-   Programming
-   Movies
-   Comedy
-   Technology
-   Sports
-   Education
-   Recently Uploaded
-   Watched

Uploaded videos can be assigned to categories and displayed through the
corresponding filters.

## Video Player

-   Video playback
-   Video title
-   Video description
-   Channel information
-   View count
-   Upload date
-   Like button
-   Dislike button
-   Like/dislike status
-   Comments
-   Recommended videos
-   Responsive watch page

## Like and Dislike

Users can:

-   Like videos
-   Unlike videos
-   Dislike videos
-   Remove dislikes
-   Switch between like and dislike
-   View current like/dislike state

Like and dislike information is stored in MongoDB.

## Comments

Users can:

-   Add comments
-   View comments
-   Edit comments
-   Delete comments
-   Like comments
-   Unlike comments

The backend provides CRUD operations for comments.

## Channel Management

Authenticated users can:

-   Create a channel
-   View their channel
-   View channels by handle
-   Update channel information
-   Upload channel avatar
-   Upload channel banner
-   View channel videos
-   Subscribe to channels
-   Unsubscribe from channels
-   Check subscription status

## Video Management

Channel owners can:

-   Upload videos
-   Upload thumbnails
-   Add title
-   Add description
-   Select category
-   Set visibility
-   Edit videos
-   Replace video files
-   Replace thumbnails
-   Delete videos
-   View uploaded videos

Video ownership is verified through protected backend routes.

## Subscriptions

Authenticated users can:

-   Subscribe to channels
-   Unsubscribe from channels
-   View subscribed channels
-   View videos from subscribed channels
-   Check subscription status

## Watch History

Authenticated users can:

-   Record watched videos
-   View watch history
-   Remove individual history items
-   Remove history by video
-   Clear complete history
-   Manage history settings

## Liked Videos

Authenticated users can view videos they have liked.

## Notifications

Authenticated users can:

-   View notifications
-   View unread notification count
-   Mark notifications as read
-   Mark all notifications as read
-   Delete notifications

## Theme

The application supports:

-   Light theme
-   Dark theme

Theme state is handled through the frontend theme provider.

## Responsive Design

The application is designed for:

-   Desktop
-   Tablet
-   Mobile

Responsive layouts are implemented throughout the frontend.

------------------------------------------------------------------------

# Technology Stack

## Frontend

-   React
-   React DOM
-   React Router
-   Axios
-   React Icons
-   Material UI
-   Vite
-   JavaScript
-   CSS

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JSON Web Token
-   bcryptjs
-   Multer
-   Cloudinary
-   CORS
-   Cookie Parser
-   Morgan
-   dotenv

## Development Tools

-   Vite
-   ESLint
-   Nodemon
-   Git
-   GitHub
-   MongoDB Atlas
-   MongoDB Compass
-   Thunder Client / Postman

------------------------------------------------------------------------

# Project Structure

``` text
youtube-clone/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# Prerequisites

Before running the project, install:

-   Node.js
-   npm
-   MongoDB Atlas account or local MongoDB
-   Git

Verify Node.js and npm:

``` bash
node -v
npm -v
```

MongoDB Atlas: https://www.mongodb.com/atlas

------------------------------------------------------------------------

# Installation

## 1. Clone the Repository

``` bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd youtube-clone
```

## 2. Install Backend Dependencies

``` bash
cd server
npm install
```

This installs all dependencies defined in `server/package.json`.

## 3. Install Frontend Dependencies

Open another terminal:

``` bash
cd client
npm install
```

This installs all dependencies defined in `client/package.json`.

------------------------------------------------------------------------

# Environment Variables

## Backend

Create:

``` text
server/.env
```

Add the environment variables required by your backend configuration:

``` env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

If Cloudinary is configured for your environment, add:

``` env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Frontend

Create:

``` text
client/.env
```

Add:

``` env
VITE_API_URL=http://localhost:5000/api/v1
```
------------------------------------------------------------------------

# Running the Application

The frontend and backend should be run separately.

## Terminal 1 - Backend

From the project root:

``` bash
cd server
npm install
npm run dev
```

Backend:

``` text
http://localhost:5000
```

API base URL:

``` text
http://localhost:5000/api/v1
```

## Terminal 2 - Frontend

From the project root:

``` bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Quick Start

### Terminal 1

``` bash
cd youtube-clone/server
npm install
npm run dev
```

### Terminal 2

``` bash
cd youtube-clone/client
npm install
npm run dev
```

Then open:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Available Scripts

## Backend

From `server`:

``` bash
npm run dev
```

Runs the Express server using Nodemon.

``` bash
npm start
```

Starts the Express server using Node.js.

## Frontend

From `client`:

``` bash
npm run dev
```

Starts the Vite development server.

``` bash
npm run build
```

Creates the production build.

``` bash
npm run preview
```

Previews the production build locally.

``` bash
npm run lint
```

Runs ESLint.

------------------------------------------------------------------------

# Authentication

The application uses JWT-based authentication.

## Registration Flow

``` text
Registration Form
        ↓
POST /api/v1/auth/register
        ↓
Input Validation
        ↓
Password Hashing
        ↓
User Creation
        ↓
MongoDB
```

## Login Flow

``` text
Login Form
        ↓
POST /api/v1/auth/login
        ↓
Credential Verification
        ↓
JWT Generation
        ↓
Authenticated User
```

Protected API requests use:

``` text
Authorization: Bearer <JWT_TOKEN>
```

------------------------------------------------------------------------

# API Overview

Base URL:

``` text
http://localhost:5000/api/v1
```

## Authentication

``` text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me
```

## Channels

``` text
POST   /channels
GET    /channels/me
GET    /channels/handle/:handle
PATCH  /channels/me
GET    /channels/subscriptions
GET    /channels/subscriptions/videos
POST   /channels/:channelId/subscribe
DELETE /channels/:channelId/subscribe
```

## Videos

``` text
GET    /videos
GET    /videos/liked
GET    /videos/me
GET    /videos/channel/:handle
GET    /videos/:id

POST   /videos
PATCH  /videos/:id
DELETE /videos/:id

POST   /videos/:id/view

POST   /videos/:id/like
DELETE /videos/:id/like

POST   /videos/:id/dislike
DELETE /videos/:id/dislike

GET    /videos/:id/like-status
```

## Comments

``` text
GET    /comments/video/:videoId
POST   /comments
PATCH  /comments/:id
DELETE /comments/:id

POST   /comments/:id/like
DELETE /comments/:id/like

GET    /comments/:id/like-status
```

## History

``` text
GET    /history
GET    /history/status
PATCH  /history/status
POST   /history/video/:videoId
DELETE /history
DELETE /history/video/:videoId
DELETE /history/:id
```

## Notifications

``` text
GET    /notifications
GET    /notifications/unread-count
PATCH  /notifications/read-all
PATCH  /notifications/:id/read
DELETE /notifications/:id
```

------------------------------------------------------------------------

# Database

The project uses MongoDB with Mongoose.

Main models include:

``` text
User
Video
Channel
Comment
VideoLike
VideoDislike
CommentLike
Subscription
History
HistorySetting
Notification
VideoView
```

The database stores user, video, channel, comment, interaction,
subscription, history, and notification data.

------------------------------------------------------------------------

# File Uploads

The backend uses Multer for handling file uploads.

The project supports:

-   Video files
-   Video thumbnails
-   Channel avatars
-   Channel banners

Cloudinary is also included in the backend dependencies for media
handling.

------------------------------------------------------------------------

# Responsive Design

The application supports:

-   Desktop
-   Tablet
-   Mobile

Responsive styling is implemented for:

-   Header
-   Sidebar
-   Home page
-   Video grid
-   Search results
-   Watch page
-   Comments
-   Channel page
-   History
-   Subscriptions
-   Liked videos
-   Notifications
-   Upload interfaces
-   Dialogs and menus

------------------------------------------------------------------------

# Testing

Recommended tools:

-   Browser
-   Thunder Client
-   Postman
-   MongoDB Compass
-   MongoDB Atlas

### Authentication

-   Registration
-   Login
-   Invalid credentials
-   Protected routes
-   Logout

### Videos

-   Fetch videos
-   Search
-   Category filtering
-   Upload
-   Watch
-   Like
-   Dislike
-   Update
-   Delete

### Comments

-   Add
-   Read
-   Edit
-   Delete
-   Like
-   Unlike

### Channels

-   Create channel
-   View channel
-   Update channel
-   Upload videos
-   Edit videos
-   Delete videos
-   Subscribe
-   Unsubscribe

------------------------------------------------------------------------

# Code Quality

The project follows a modular full-stack architecture.

Frontend responsibilities are separated into:

-   Components
-   Pages
-   Routes
-   Services
-   Providers
-   Hooks
-   Utilities
-   Styles

Backend responsibilities are separated into:

-   Routes
-   Controllers
-   Services
-   Models
-   Middleware
-   Utilities
-   Configuration

The backend uses ES Modules with `import` and `export`.

The frontend uses Vite instead of Create React App.

------------------------------------------------------------------------

# Screenshots

# Screenshots

## Main Interface

<p align="center">
  <img width="48%" alt="Home Page" src="https://github.com/user-attachments/assets/8228a6d9-99c0-4aa6-aeb4-452070be11e0" />
  <img width="48%" alt="Search Results" src="https://github.com/user-attachments/assets/b3e55979-6376-408a-83d0-6490fe308aee" />
</p>

<p align="center">
  <b>Home Page</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Search Results</b>
</p>

<br />

<p align="center">
  <img width="48%" alt="Category Filtering" src="https://github.com/user-attachments/assets/56a0edf2-1187-4b47-bb72-1659afa562ff" />
  <img width="48%" alt="Dark Theme" src="https://github.com/user-attachments/assets/f54424aa-b253-405b-8d0e-13198b3df22b" />
</p>

<p align="center">
  <b>Category Filtering</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Dark Theme</b>
</p>

---

## Authentication

<p align="center">
  <img width="48%" alt="Registration Page" src="https://github.com/user-attachments/assets/35baeeec-39a6-4bd0-bfe8-8c91aff8a9d6" />
  <img width="48%" alt="Login Page" src="https://github.com/user-attachments/assets/f43eea62-cdf1-4f7a-93e6-8f87b9068cd7" />
</p>

<p align="center">
  <b>Registration Page</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Login Page</b>
</p>

---

## Video Experience

<p align="center">
  <img width="48%" alt="Video Player" src="https://github.com/user-attachments/assets/33d7d505-37bf-4218-9393-c06ba1c35f1d" />
  <img width="48%" alt="Comments" src="https://github.com/user-attachments/assets/b9a1326a-13f6-4797-87a2-e1b9f40089e5" />
</p>

<p align="center">
  <b>Video Player</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Comments</b>
</p>

---

## Channel & Video Management

<p align="center">
  <img width="48%" alt="Channel Page" src="https://github.com/user-attachments/assets/2158013e-2937-41a0-8ab2-502698949232" />
  <img width="48%" alt="Upload Video" src="https://github.com/user-attachments/assets/383624ff-238f-4d8a-a3d6-eb55e2e66bc3" />
</p>

<p align="center">
  <b>Channel Page</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Upload Video</b>
</p>

<br />

<p align="center">
  <img width="48%" alt="Manage Videos" src="https://github.com/user-attachments/assets/e8dfb6cc-8b0e-468b-bc21-d0e160d1840d" />
</p>

<p align="center">
  <b>Manage Videos</b>
</p>

---

## User Features

<p align="center">
  <img width="32%" alt="History" src="https://github.com/user-attachments/assets/113613a6-bc9a-4582-84f7-baefb6b03c87" />
  <img width="32%" alt="Subscriptions" src="https://github.com/user-attachments/assets/ce08d519-ef67-4ac7-b9d6-d0aeec2829cc" />
  <img width="32%" alt="Notifications" src="https://github.com/user-attachments/assets/8e3cba04-a425-41b2-b294-734b9f583716" />
</p>

<p align="center">
  <b>History</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Subscriptions</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Notifications</b>
</p>

---

## Responsive Design

<p align="center">
  <img width="30%" alt="Mobile Responsive Layout" src="https://github.com/user-attachments/assets/63e85640-f556-42af-9f98-483d7a4c93d5" />
  &nbsp;&nbsp;
  <img width="45%" alt="Tablet Responsive Layout" src="https://github.com/user-attachments/assets/c3b806f8-536c-42f6-88a1-0b25a5ce75fc" />
</p>

<p align="center">
  <b>Mobile Responsive Layout</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Tablet Responsive Layout</b>
</p>

------------------------------------------------------------------------

# Project Links

## GitHub Repository

https://pritamsatpute.github.io/youtube-clone/

## Live Application

NO_LIVE_APPLICATION_YET
