import { UserType } from "./User";
import { BookType } from "./Book";

export const typeDefs = `#graphql
  ${UserType}
  ${BookType}
  type Query {
    hello: String!
    dbInfo: String!
    books: [Book!]!
    users: [User!]!
  }
`;
