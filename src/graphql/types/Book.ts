export const BookType = `
  type Book {
    id: ID!
    title: String!
    author: String! 
    publicationDate: String!
    image: String
    rating: Float!
    ratingsCount: Int!
    favorites: [Favorite!]!
    isFavorited: Boolean!
  }
`;
