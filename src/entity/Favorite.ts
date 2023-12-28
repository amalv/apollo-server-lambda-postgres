import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Book, (book) => book.favorites)
  book: Book;
}
