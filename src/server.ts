import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";
import winston from "winston";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

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

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: `https://dev-udel1dobwtbe8ips.us.auth0.com/.well-known/jwks.json`,
  });
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();

    callback(null, signingKey);
  });
}

const decodeToken = (token: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    if (token?.startsWith("Bearer ")) {
      const jwtToken = token.slice(7, token.length).trimStart();
      jwt.verify(
        jwtToken,
        getKey,
        { algorithms: ["RS256"] },
        function (err, decoded) {
          if (err) {
            logger.error("Invalid token");
            reject(new Error("Invalid token"));
          } else if (typeof decoded !== "string" && decoded?.sub) {
            resolve(decoded.sub);
          } else {
            resolve(undefined);
          }
        }
      );
    } else {
      resolve(undefined);
    }
  });
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
      const userId = await decodeToken(token);

      return {
        userId,
        lambdaEvent: event,
        lambdaContext: context,
      };
    },
  }
);

export { graphqlHandler };
