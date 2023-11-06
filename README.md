# Express.js HTTP server

This is a template repository for a basic Express.js server with built-in security and logging middlewares. This is
useful for starting any Express.js based project with a basic and secure setup.

## Features

- Configurable security settings using the [helmet](https://www.npmjs.com/package/helmet) package.
- Basic rate limiting using the [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) package.
- Configurable CORS middleware using the [cors](https://www.npmjs.com/package/cors) package.
- Loading environment variables from a .env file using [dotenv](https://www.npmjs.com/package/dotenv).
- Use of built-in Express.js middleware for handling JSON and URL encoded requests.
- Custom logger for logging server events, such as requests, responses and errors.
- A simple setup to serve static files.
- Error handling routes for testing, and serving 404 and 500 error pages.

## Install & Run

- Copy `config/config-env.txt`, rename to `config.env` and modify values
- Create MongoDB database, copy connection string to `config.env`
- Run `npm i` to install
- Run the server with `npm run dev` for nodemon or `npm start`
