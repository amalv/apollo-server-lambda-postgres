import { BookResolvers } from "./Book";
import { FavoriteResolvers } from "./Favorite";

export const resolvers = {
  Query: {
    ...BookResolvers.Query,
  },
  Mutation: {
    ...FavoriteResolvers.Mutation,
  },
};
