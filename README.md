## OpenAgent Junior Software Engineer Tech Test

This client app is built with **React**, **Next.js**, and api is built with **Express.js**, using **SQLite** for data storage.
Providing docker-compose file for running the app.

### Table of Contents

- [OpenAgent Junior Software Engineer Tech Test](#openagent-junior-software-engineer-tech-test)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [For backend api](#for-backend-api)
      - [Running the application](#running-the-application)
  - [Running with Docker](#running-with-docker)
  - [Running Tests](#running-tests)
  - [API Endpoints](#api-endpoints)
  - [Potential improvements](#potential-improvements)

### Technologies Used

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: node 18, Express.js
- **Database**: SQLite
- **Testing**: Jest
- **Containerization**: Docker, Docker Compose
- Using npm workspaces to manage the monorepo

### Installation

- Clone the repository:

```bash
git clone https://github.com/TODO:/contactus.git
cd contactus
```

#### For backend api

- Install the dependencies:

```bash
npm install
```

- Create the SQLite database:

```bash
node createDb.js
```

##### Running the application

- Change .env.dev to .env
- Start the backend server (Express.js):

```bash
npm run dev
```

- Start the frontend application (Next.js):

```bash
npm run dev
```

The backend will run on http://localhost:9000 and the frontend will run on http://localhost:3000.

### Running with Docker

- Build the Docker image:

```bash
docker-compose build
```

- Start the containers:

```bash
docker-compose up
```

### Running Tests

Go to each folder (packages/api, packages/ui) and run the following command to run the tests:

```bash
npm run test
```

### API Endpoints

### Potential improvements

- API could be built using webpack to reduce image size
- Better to use TypeScript for backend Restful API
- Could use swagger-jsdoc for API documentation
- UI side could use pagination for loading all contacts
- PostgreSQL could be easier than sqlite. Because I've never used sqlite before, so trying to
