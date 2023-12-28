import { ApolloServer } from "@apollo/server";

jest.mock("./graphql/types");

jest.mock("./graphql/resolvers", () => ({
  Query: {
    users: jest.fn(),
    books: jest.fn(),
  },
}));

jest.mock("@as-integrations/aws-lambda", () => ({
  startServerAndCreateLambdaHandler: jest.fn(() => () => {}),
  handlers: {
    createAPIGatewayProxyEventV2RequestHandler: jest.fn(() => () => {}),
  },
}));

describe("server.ts", () => {
  it("creates an ApolloServer instance with the correct resolvers and typeDefs", () => {
    const { startServerAndCreateLambdaHandler } = jest.requireMock(
      "@as-integrations/aws-lambda"
    );

    const { graphqlHandler } = require("./server");

    expect(startServerAndCreateLambdaHandler).toHaveBeenCalled();
    expect(typeof graphqlHandler).toBe("function");
  });
});
