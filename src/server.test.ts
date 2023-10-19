import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./server";

jest.mock("pg", () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mockClient) };
});

it("returns hello with the provided name", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response: any = await testServer.executeOperation({
    query: "query { hello }",
  });

  expect(response.body.singleResult.data.hello).toBe("Hello, world!");
});
