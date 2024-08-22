 # MCQ Test MERN Application

Welcome to the MCQ Test application, a full-stack MERN project featuring authentication, registration, and protected routes. This application includes a modern video background login page, a registration page, and several protected routes that require user authentication.

## Table of Contents

1. Features
2. Getting Started
   - Prerequisites
   - Installation
   - Environment Setup
3. Folder Structure
4. Authentication Flow
5. Deployment
6. Troubleshooting
7. Contributing
8. License

## Features

- User Authentication: Secure login and registration system.
- Protected Routes: Restricted access to certain pages based on authentication.
- Video Background: Dynamic video background on the login page.
- Session Management: JWT tokens stored in session storage to manage user sessions.
- Error Handling: Informative error messages for authentication failures.

## Getting Started

### Prerequisites

- Node.js: Version 14 or higher. [Download Node.js](https://nodejs.org/).
- npm: Comes bundled with Node.js, used for managing dependencies.

### Installation

1. Clone the Repository:
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository

2. Install Dependencies:
   npm install

3. Start the Development Server:
   npm start

   Open http://localhost:3000 in your browser to see the application in action.

## Environment Setup

### Backend Configuration

Ensure the Backend Server:
- The backend server should be running on http://localhost:5000. Adjust the API URL if needed.

API Endpoints:
- Login Endpoint: POST /api/auth/login
  Request Body: { "email": "user@example.com", "password": "yourpassword" }
  Response: { "token": "jwt_token_here" }

- Registration Endpoint: POST /api/auth/register
  Request Body: { "email": "user@example.com", "password": "yourpassword" }
  Response: { "message": "User registered successfully" }

## Folder Structure

src/components/: Contains the React components.
- Login.js: Manages user login functionality.
- Register.js: Handles user registration.
- TestPage.js: Displays a protected page for users.
- MCQTestPage.js: Features a multiple-choice quiz.
- FinishTestPage.js: Shows a completion message after a test.

src/App.js: Main component responsible for routing.
src/index.js: Entry point for the React application.
public/index.html: HTML template with the root element for React.

## Authentication Flow

Login Page (/login):
- Users enter their email and password.
- On successful login, a JWT token is stored in session storage, and users are redirected to the /test page.
- If login fails, an error message is displayed.

Registration Page (/register):
- Users can register by providing an email and password.
- Upon successful registration, users are redirected to the login page.

Protected Routes:
- Routes like /test, /mcq-test, and /finish-test are protected and require a valid token.
- Unauthorized users are redirected to the login page.

Video Background:
- The login page features a video background to enhance the user experience.

## Deployment

1. Build the Application:
   Create a production build of the app with:
   npm run build

   This command generates a build directory with optimized files.

2. Deploy:
   Deploy the contents of the build directory to your hosting provider (e.g., Vercel, Netlify, AWS S3).

## Troubleshooting

Login Issues:
- Ensure the backend server is running and check the API URL. Look for network errors and inspect API responses.

Token Storage:
- Verify that tokens are correctly stored and retrieved from session storage.

Video Issues:
- Confirm that the video URL is correct and the video file is accessible.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with descriptive messages.
4. Push your branch to your forked repository.
5. Open a pull request with details about your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

