import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Favorite } from "./Favorite";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column("date")
  publicationDate: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ type: "int", default: 0 })
  ratingsCount: number;

  @OneToMany(() => Favorite, (favorite) => favorite.book)
  favorites: Favorite[];
}
