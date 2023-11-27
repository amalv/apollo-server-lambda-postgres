import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

let server: ApolloServer | undefined;
try {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
} catch (error) {
  logger.error("Error starting Apollo Server:", error);
  process.exit(1);
}

const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);

export { graphqlHandler };
