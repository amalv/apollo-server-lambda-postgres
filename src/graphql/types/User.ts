export const UserType = `
  type User {
    id: ID!
    auth0Id: String!
    favorites: [Favorite!]!
  }
`;
