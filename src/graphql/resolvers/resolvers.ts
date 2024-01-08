import { BookResolvers } from "./Book";
import { FavoriteResolvers } from "./Favorite";
import { AdminResolvers } from "./Admin";

export const resolvers = {
  Query: {
    ...BookResolvers.Query,
  },
  Mutation: {
    ...FavoriteResolvers.Mutation,
    ...AdminResolvers.Mutation,
  },
};
