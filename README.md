
# Task Management System

- ** (Live Site)[https://task-manager-finished.netlify.app/]

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Client Side](#client-side)
  - [Server Side](#server-side)
- [Usage](#usage)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
- [Dependencies](#dependencies)
  - [Client Side](#client-side-dependencies)
  - [Server Side](#server-side-dependencies)
- [Documentation](#documentation)
- [Optional Features](#optional-features)

## Overview

Task Manager is a full-stack web application designed to manage tasks efficiently. It includes an authentication system with two user roles (Admin and User), a task management board, and functionalities for assigning, viewing, and updating tasks.

## Key Features

1. **Authentication System**:
   - Two user roles: Admin and User.
   - Admin capabilities: add, delete, edit tasks, assign tasks to users, manage task statuses.
   - User capabilities: view assigned tasks, mark tasks as completed, change task status (cannot delete tasks).

2. **Task Management**:
   - Admin can assign tasks to multiple users.
   - Users can view, complete, and change the status of tasks assigned to them.

3. **Board for Task Status**:
   - A board displaying tasks with statuses (To-Do, In Progress, Completed).
   - Drag-and-drop functionality to enhance task management (optional feature).

## Tech Stack

- **Client Side**: React, Tailwind CSS, DaisyUI, React DnD, Axios, Firebase, React Icons, React Router DOM, SweetAlert2, Tanstack React Query
- **Server Side**: Node.js, Express, MongoDB, JSON Web Token (JWT), Cookie-Parser, CORS, Dotenv

## Project Structure

```
client/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── firebase/
│   ├── provider/
│   ├── routs/
│   ├── main.jsx
│   └── ...
├── public/
├── package.json
└── ...

server/
├── index.js
├── .env
├── package.json
└── ...
```

## Installation

### Client Side

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Sadek-1801/task-manager-finished.git
   cd client/task-manager-client
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase config to your environment variables.
   - Add server-side-url environment variables(e.g: http://localhost:9000).

4. **Run the application**:
   ```sh
   npm run dev
   ```

### Server Side

1. **Move to Home**:
   ```sh
   cd server
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of the server directory.
   - Add your MongoDB URI, JWT secret, and other necessary environment variables.

4. **Run the server**:
   ```sh
   npm start
   nodemon index.js
   ```

## Usage

### Running the Client

- Ensure you have all dependencies installed and your Firebase project set up.
- Run `npm run dev` to start the development server.
- Open `http://localhost:5173` to view the application.

### Running the Server

- Ensure you have all dependencies installed and environment variables set up.
- Run `npm start` or `nodemon index.js` to start the server.
- The server will run on `http://localhost:9000`.

## Dependencies

### Client Side Dependencies

- **[@headlessui/react](https://www.npmjs.com/package/@headlessui/react)**
- **[@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)**
- **[axios](https://www.npmjs.com/package/axios)**
- **[firebase](https://www.npmjs.com/package/firebase)**
- **[react](https://www.npmjs.com/package/react)**
- **[react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)**
- **[react-datepicker](https://www.npmjs.com/package/react-datepicker)**
- **[react-dnd](https://www.npmjs.com/package/react-dnd)**
- **[react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)**
- **[react-dom](https://www.npmjs.com/package/react-dom)**
- **[react-icons](https://www.npmjs.com/package/react-icons)**
- **[react-router-dom](https://www.npmjs.com/package/react-router-dom)**
- **[react-trello](https://www.npmjs.com/package/react-trello)**
- **[sweetalert2](https://www.npmjs.com/package/sweetalert2)**

### Server Side Dependencies

- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**
- **[cors](https://www.npmjs.com/package/cors)**
- **[dotenv](https://www.npmjs.com/package/dotenv)**
- **[express](https://www.npmjs.com/package/express)**
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[mongodb](https://www.npmjs.com/package/mongodb)**

## Documentation

### Client Side

- **Authentication System**: Implemented with Firebase, ensuring secure login and role-based access.
- **Task Management**: Admin and User roles have different capabilities for managing tasks.
- **Board for Task Status**: Displayed using React Beautiful DnD for a smooth drag-and-drop experience.

### Server Side

- **Authentication**: JWT tokens and admin verification middleware are used for secure authentication.
- **Task Management**: CRUD operations are handled via Express routes.
- **Database**: MongoDB is used to store user and task data.

## Optional Features

- **Drag-and-Drop Functionality**: Implemented using React Beautiful DnD for enhancing user experience in task management.


## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is open-source and available under the [MIT License](LICENSE).

---
