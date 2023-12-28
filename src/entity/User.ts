import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Favorite } from "./Favorite";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth0Id: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
