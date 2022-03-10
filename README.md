# pizzeria-demo
Pizza Ordering Website

This project uses NodeJS as the backend, ReactJS as frontend and Mongodb Atlas as the database.

To run the project:

    1. Go to https://nodejs.org/en/download/ and download nodejs (version 16.14.0 or higher) for your system.
    2. Sign in to MongoDB Atlas and create a new cluster with database name as 'pizzeria'.
    3. Inside DB pizzeria, create 2 collections - pizzas, and toppings.
    4. In collection pizzas, click insert documents and paste the contents from assets/Sample json/pizzas.json and insert.
    5. In collection toppings, click insert documents and paste the contents from assets/Sample json/toppings.json and insert.
    6. Now on the cluster page, click connect, select the 'connect your application' option and copy the connection string.
    7. Clone the repository or download the zip file.
    8. paste the connection string in place of "YOUR_CONNECTION_URL" in the /pizzeria-backend/.env file.
    9. Open terminal, go to pizzeria-backend, write command 'npm i', then 'node index.js'.
    10. Open another terminal, go to pizzeria-frontend, write command 'npm i', then 'npm start'.
    11. Project is up and running.
