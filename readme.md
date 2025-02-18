## Grocery store backend app
- The backend server handles various functions like creating products, fetching lists, editing and deleting products.
- The backend also handles creating users, logging in, managing and verifying jwt token & cookies.
- Based on whether cookie has valid jwt token the middlewares will allow the requests.
- The DELETE, PUT, PATCH request to remove, edit and update inventory has additional middleware that allows only 'admin' to perform requests.
- The users can view the list of products and order items

## How to setup
- Clone the repository to your local folder.
- Add database, jwt secret etc in .env file.
- Run 'npm install' cmd to install dependencies.
- Run 'npm run build' cmd to build the typescript files.
- Run 'node dist/server.js' cmd to start the application.