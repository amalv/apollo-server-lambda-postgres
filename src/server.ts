import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { config } from "dotenv";
import { Client } from "pg";
import * as fs from "fs";

if (process.env.NODE_ENV !== "production") {
  config();
}

let sslCertificate;

if (process.env.NODE_ENV === "production") {
  sslCertificate = fs.readFileSync("/var/task/certs/global-bundle.pem");
} else if (process.env.DB_SSL_CERT) {
  sslCertificate = fs.readFileSync(process.env.DB_SSL_CERT);
}

if (process.env.DB_SSL_CERT) {
  sslCertificate = fs.readFileSync(process.env.DB_SSL_CERT);
}

const dbPort = process.env.DB_PORT;

if (!dbPort || isNaN(parseInt(dbPort))) {
  throw new Error("Invalid DB port");
}

// Create a new PostgreSQL client
const client = new Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_ENDPOINT,
  database: process.env.DB_NAME,
  port: dbPort,
  ssl: {
    rejectUnauthorized: true,
    ca: sslCertificate || undefined,
  },
});

// Connect to the database
client.connect();

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A resolver for the hello query

const resolvers = {
  Query: {
    hello: async () => {
      const result = await client.query("SELECT version(), current_database()");

      await client.end();

      const version = result.rows[0].version;
      const databaseName = result.rows[0].current_database;

      return `Connected to ${databaseName} (version ${version})`;
    },
  },
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This final export is important!
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
