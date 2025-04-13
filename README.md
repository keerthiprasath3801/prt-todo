# Backend API
A simple backend built with **Node.js** and **Express**.
This backend handles authentication and task management.

1. Clone the repo:   
git clone https://github.com/keerthiprasath3801/prt-todo.git
2. Go to the root folder:
Install dependencies:
 npm init -y
 npm install express cors bcrypt joi body-parser jsonwebtoken mongoose
 npm install nodemon -D.
3.Go to cd backend :
npm run dev - to run backend.
4. Create a .env file with these variables:
   - MONGO_URI: MongoDB connection URI.
   - JWT_SECRET: Secret key for JWT.
5. Run the server:
   npm run dev
## Setup
1. Clone the repo:
   git clone https://github.com/keerthiprasath3801/prt-todo.git
2. Go to the root folder:
   Install dependencies:
   npm install
3.Go to cd backend  : to run backend
   npm run dev
## Packages Used
bcrypt For password hashing.
express For setting up the server.
jsonwebtokenc: For JWT authentication.
mongoose: For MongoDB interaction.
dotenv : For environment variables.
joi: For data validation.

#Folder Structure
#controllers
authController.js
taskController.js

#middlewares
auth.js
authValidation.js

#models
db.js
task.js
user.js

#routes
authRouter.js
taskRouter.js

server.js
package.json

# Frontend

This is the frontend of the To-Do application built with **React** and **Vite**.

## Setup
1. Clone the repo:
   git clone https://github.com/keerthiprasath3801/prt-todo.git
2. Go to the frontend folder:
   cd frontend
3. Install dependencies:
   npm install
4. Run the development server:
   npm run dev
## Packages Used
react: A JavaScript library for building user interfaces.
react-dom: React's package for working with the DOM.
react-router-dom: For routing in the application.
react-toastify: For displaying toast notifications.

#Folders & Files Description
1. SignUpPage – Handles user registration functionality.
2. LoginPage – Manages user login process.
3. HomePage – Displays and manages user tasks after successful login.
4. utils.js – Contains utility functions, such as showing toast notifications.

## Development Tools
vite: A fast and lightweight build tool.





