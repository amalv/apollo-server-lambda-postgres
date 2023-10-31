import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "bukie.cyfdzdbh08gz.eu-north-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "8tstpNfbWPKwePDOrIUq",
  database: "bukie",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*.{js,ts}"],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => console.log(error));
