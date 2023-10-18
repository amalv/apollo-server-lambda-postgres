# Apollo Server Lambda Postgres

An Apollo Server GraphQL API that uses Postgres as a database and is deployed to AWS Lambda.

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
🐘 Use Postgres as a database\
🔒 Secure database connection using environment variables\
🔍 Sample query command provided for easy testing
