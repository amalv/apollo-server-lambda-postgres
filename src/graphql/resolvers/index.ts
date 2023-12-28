import { UserResolvers } from "./User";
import { BookResolvers } from "./Book";
import { FavoriteResolvers } from "./Favorite";

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...BookResolvers.Query,
    ...FavoriteResolvers.Query,
  },
  Mutation: {
    ...FavoriteResolvers.Mutation,
  },
};
