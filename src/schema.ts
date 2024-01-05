import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  doublePrecision,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  auth0Id: varchar("auth0Id").notNull(),
});

export const book = pgTable("book", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  publicationDate: date("publicationDate").notNull(),
  image: varchar("image"),
  rating: doublePrecision("rating").default(0).notNull(),
  ratingsCount: integer("ratingsCount").default(0).notNull(),
});

export const favorite = pgTable(
  "favorite",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId")
      .notNull()
      .references(() => user.id),
    bookId: integer("bookId")
      .notNull()
      .references(() => book.id),
  },
  (t) => ({
    userBookUnique: unique().on(t.userId, t.bookId),
  })
);
