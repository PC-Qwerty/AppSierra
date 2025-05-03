# TaskMaster

A multi-user task tracking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. The application empowers users to efficiently manage their projects and tasks in a secure, scalable environment.

The core functionality includes user registration and authentication using JSON Web Tokens (JWT), allowing each user to manage up to four distinct projects. Within these projects, users can create, read, update, and delete tasks. Each task supports detailed metadata including a title, description, status (To Do, In Progress, Completed), and timestamps for creation and completion.

Designed with a clean, intuitive, and responsive user interface, the app ensures accessibility across all devices. The backend includes robust validation, error handling, and follows best practices for code quality, maintainability, and scalability. Additional features can be added to further enhance the user experience and application flexibility.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login, registration)
- Profile management
- Project management (create, edit, delete)
- Task management within projects
- Responsive design

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Router, Jotai (for state management), React Hook Form
- **Backend**: Node.js, Express, MongoDB (or your chosen database)
- **Others**: Axios (for API calls), Lucide React (for icons)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PC-Qwerty/AppSierra.git
   cd AppSierra
   ```

2. Install dependencies for both client and server:

   - For the client:

     ```bash
     cd client
     npm install
     ```

   - For the server:
     ```bash
     cd server
     npm install
     ```

## Usage

### Running the Application

1. **Start the server**:

   ```bash
   cd server
   npm run start:dev
   ```

2. **Start the client**:

   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified in your client configuration).

## API Endpoints

- **POST /api/auth/login**: Authenticate a user and return user data and token.
- **POST /api/auth/register**: Register a new user.
- **GET /api/projects**: Fetch all projects for the authenticated user.
- **POST /api/projects**: Create a new project.
- **PUT /api/projects/:id**: Update an existing project.
- **DELETE /api/projects/:id**: Delete a project.

### Environment Variables

Make sure to create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_server_port
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
