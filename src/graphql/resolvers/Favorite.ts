import { addFavorite, removeFavorite } from "../../services";

export const FavoriteResolvers = {
  Mutation: {
    addFavorite: async (_, { bookId }, context) => {
      const userId = context.userId;
      return await addFavorite(userId, bookId);
    },
    removeFavorite: async (_, { bookId }, context) => {
      const userId = context.userId;
      try {
        await removeFavorite(userId, bookId);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
