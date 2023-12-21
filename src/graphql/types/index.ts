import { UserType } from "./User";
import { BookType } from "./Book";
import { BooksPageType } from "./BooksPage";

export const typeDefs = `#graphql
  ${UserType}
  ${BookType}
  ${BooksPageType}
  type Query {
    hello: String!
    dbInfo: String!
    users: [User!]!
    books(title: String, cursor: String, limit: Int): BooksPage!
  }
`;
