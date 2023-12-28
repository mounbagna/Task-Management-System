# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Task-Management-System

# AT THE SERVER SITE

-cd server
-npm run start

# AT THE CLIENT SITE

-cd client
-npm run dev

Once you run the above command, navigate through the link that will appear. Three buttons will appear(user login,user registration and Admin login).

# AT THE ADMIN SITE

-A new admin can be created by sending an HTTP request in the request.rest file inside the code(The default email and password of the admin is abdellaabasse@iut-dhaka.edu and 123 respectively).

# AT THE USER SITE

-For a user to start using the system, he/she has to first register to the system(The default email and password of the user is ibrahimnuhu@iut-dhaka.edu and 123 respectively).
-To edit a task, the user will first enter the tasks name to edit then procede with the modification
N/B: If at one point you delete a task and that the system start acting unexpectedly, run the server again(by refreshing the index.js file). The deleted task will be deleted in the database and you can continue your operation.

# AUTHENTICATION WITH JWT

To check for user authentication during login and the function of JWT, use the request.rest file and create or use the existing users for login.A token will be generated at every new login. Use this token and verify the authenticity of that specific user.
