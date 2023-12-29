import { dataSource } from "../../data-source";
import { User } from "../../entity/User";

export const UserResolvers = {
  Query: {
    users: async () => {
      try {
        const dataSourceInstance = await dataSource;
        const userRepository = dataSourceInstance.getRepository(User);
        const users = await userRepository.find();
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    user: async (_, __, context) => {
      try {
        const userId = context.userId;

        if (!userId) {
          throw new Error("User ID not provided");
        }

        const dataSourceInstance = await dataSource;
        const userRepository = dataSourceInstance.getRepository(User);
        const user = await userRepository.findOne({
          where: { auth0Id: userId },
          relations: ["favorites", "favorites.book"],
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
  },
};
