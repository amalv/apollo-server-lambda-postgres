import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";
import winston from "winston";
import jwt from "jsonwebtoken";

interface GraphQLContext {
  userId?: string;
  lambdaEvent?: any;
  lambdaContext?: any;
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "/tmp/error.log", level: "error" }),
    new winston.transports.File({ filename: "/tmp/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const decodeToken = (token: string): string | undefined => {
  if (token?.startsWith("Bearer ")) {
    const jwtToken = token.slice(7, token.length).trimStart();
    try {
      const decoded = jwt.decode(jwtToken);
      if (typeof decoded !== "string" && decoded?.sub) {
        return decoded.sub;
      }
    } catch (err) {
      logger.error("Invalid token");
    }
  }
};

let server: ApolloServer | undefined;
try {
  server = new ApolloServer<GraphQLContext>({
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
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event, context }) => {
      const token = event.headers.authorization || "";
      const userId = decodeToken(token);

      return {
        userId,
        lambdaEvent: event,
        lambdaContext: context,
      };
    },
  }
);

export { graphqlHandler };
