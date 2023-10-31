import { UserResolvers } from "./User";
import { BookResolvers } from "./Book";

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...BookResolvers.Query,
  },
};
