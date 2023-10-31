import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { config } from "dotenv";
import { Client } from "pg";
import * as fs from "fs";
import { dataSource } from "./data-source";
import { User } from "./entity/User";

interface SslOptions {
  rejectUnauthorized: boolean;
  ca: string;
}
interface QueryResult {
  rows: {
    name: string;
    version: string;
  }[];
}

if (process.env.NODE_ENV !== "production") {
  config();
}

const sslCertificate =
  process.env.NODE_ENV === "production"
    ? fs.readFileSync("/var/task/certs/global-bundle.pem")
    : fs.readFileSync(process.env?.DB_SSL_CERT);

if (!process.env.DB_PORT || isNaN(parseInt(process.env.DB_PORT))) {
  throw new Error("Invalid DB port");
}

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String! 
    publicationDate: String!
    image: String
    rating: Float!
    ratingsCount: Int!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
  }
  type Query {
    hello: String!
    dbInfo: String!
    books: [Book!]!
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
    dbInfo: async () => {
      const env = process.env;

      const sslOptions: SslOptions = {
        rejectUnauthorized: false,
        ca: env.DB_SSL_CERT,
      };

      const client = new Client({
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        host: env.DB_ENDPOINT,
        database: env.DB_NAME,
        port: env.DB_PORT,
        ssl: sslOptions,
      });

      try {
        await client.connect();

        const result: QueryResult = await client.query(
          "SELECT current_database() AS name, version()"
        );

        await client.end();

        const { name, version } = result.rows[0];

        return `Database name: ${name}, PostgreSQL version: ${version}`;
      } catch (error) {
        throw new Error(`Error executing SQL query: ${error.message}`);
      }
    },
    books: async () => {
      const env = process.env;

      const sslOptions: SslOptions = {
        rejectUnauthorized: false,
        ca: env.DB_SSL_CERT,
      };

      const client = new Client({
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        host: env.DB_ENDPOINT,
        database: env.DB_NAME,
        port: env.DB_PORT,
        ssl: sslOptions,
      });

      try {
        await client.connect();

        const result: QueryResult = await client.query("SELECT * FROM book");

        await client.end();

        return result.rows;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
    users: async () => {
      try {
        const dataSourceInstance = await dataSource;
        const userRepository = dataSourceInstance.getRepository(User);
        const users = await userRepository.find();
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  },
};

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

export { typeDefs, resolvers };
