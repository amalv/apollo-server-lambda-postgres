import { dataSource } from "../../data-source";
import { Favorite } from "../../entity/Favorite";
import { addFavorite, removeFavorite } from "../../services";

export const FavoriteResolvers = {
  Mutation: {
    addFavorite: async (_, { bookId }, context) => {
      const userId = context.userId;
      const savedFavorite = await addFavorite(userId, bookId);
      console.log("Saved favorite:", savedFavorite);
      return savedFavorite;
    },
    removeFavorite: async (_, { bookId }, context) => {
      const userId = context.userId;
      const result = await removeFavorite(userId, bookId);
      console.log("Removed favorite:", result);
      return result;
    },
  },
  Query: {
    getFavorites: async (_, { userId }, context) => {
      try {
        const dataSourceInstance = await dataSource;
        const favoriteRepository = dataSourceInstance.getRepository(Favorite);

        const favorites = await favoriteRepository.find({
          where: { user: { id: userId } },
          relations: ["user", "book"],
        });
        console.log("Fetched favorites:", favorites);
        return favorites;
      } catch (error) {
        console.error("Error fetching favorite books:", error);
        throw error;
      }
    },
  },
};
