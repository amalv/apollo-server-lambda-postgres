# Serverless GraphQL API with Apollo, AWS Lambda, and Postgres

This project is a practical demonstration of a serverless GraphQL API built with Apollo Server, deployed on AWS Lambda, and using Postgres as a database. TypeORM is used for data manipulation and interaction with Postgres. While the application serves as a book listing API, the primary focus is to illustrate the effective use of this technology stack.

## Prerequisites

Before you can run this project locally, you will need to:

1. Install Node.js and npm on your machine.
2. Create an AWS account and configure your AWS credentials.
3. Set up a Postgres database.

Please refer to the official documentation for each of these services for detailed instructions.

## Installation

After cloning the project, navigate to the project directory and run the following command to install the project dependencies:

```bash
npm install
```

## Local Development

To start the local development server, run the following command:

```bash
npx serverless offline
```

This will start the server at `http://localhost:3000`. The available endpoints will be displayed in the terminal.

When the application starts, the `initializeDataSource` function in `data-source.ts` is called. This function is responsible for setting up the connection to the Postgres database and initializing the entities. It uses TypeORM's `initialize` method to establish the connection and synchronize the database schema based on the defined entities.

## Invoking Function Locally

You can invoke the GraphQL function locally for testing and development purposes using the following command:

```bash
serverless invoke local -f graphql -p query.json --env NODE_ENV=development
```

## Testing

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm run test
```

This will run all the test files in the project and provide a coverage report.

For TypeScript, `ts-jest` is used to allow Jest to understand TypeScript syntax. The types for Jest are included as a dev dependency (`@types/jest`) to provide autocompletion and type checking for Jest functions.

## Deployment

To deploy the API, you can use the `serverless deploy` command. This will deploy the API to AWS Lambda.

Before deploying the API, you need to create a `.env` file with the following variables:

```env
DB_ENDPOINT=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

You can use the `.env_sample` file as a template for creating the `.env` file.

After deploying the API, you can make a sample query using the following command:

```bash
serverless invoke local -f graphql -p query.json --env NODE_ENV=development
```

## Features

🚀 Deploy an Apollo Server GraphQL API to AWS Lambda\
🐘 Use Postgres as a database with TypeORM for efficient data manipulation\
🔒 Secure database connection using environment variables\
🔍 Sample query command provided for easy testing\
👥 Handle user data and their interactions with books\
📝 Utilize GraphQL for efficient data fetching and manipulation\
📦 Serverless architecture for scalability and cost efficiency\
📈 Winston logger for comprehensive logging\
🔧 Jest for unit testing and coverage\
🔄 Database migrations to manage database changes\
🔀 TypeScript for static typing\
