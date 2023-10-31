import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";

let server;
try {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
} catch (error) {
  console.error("Error starting Apollo Server:", error);
  process.exit(1);
}

const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);

export { typeDefs, resolvers, graphqlHandler };
