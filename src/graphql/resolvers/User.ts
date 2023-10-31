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
  },
};
