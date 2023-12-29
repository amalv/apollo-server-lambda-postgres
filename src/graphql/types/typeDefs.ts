import { UserType } from "./User";
import { BookType } from "./Book";
import { BooksPageType } from "./BooksPage";
import { FavoriteType } from "./Favorite";

export const typeDefs = `#graphql
  ${UserType}
  ${BookType}
  ${BooksPageType}
  ${FavoriteType}
  type Query {
    hello: String!
    dbInfo: String!
    user: User
    users: [User!]!
    books(author: String, title: String, cursor: String, limit: Int): BooksPage!
    favoriteBooks(userId: ID!): [Favorite!]!
  }
  type Mutation {
    favoriteBook(bookId: ID!): Favorite
  }`;
