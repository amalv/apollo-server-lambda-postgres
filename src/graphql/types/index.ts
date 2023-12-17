import { UserType } from "./User";
import { BookType } from "./Book";

export const typeDefs = `#graphql
  ${UserType}
  ${BookType}
  type Query {
    hello: String!
    dbInfo: String!
    users: [User!]!
    books(title: String): [Book!]!
  }
`;
