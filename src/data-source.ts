import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}
console.log(process.env.DB_USERNAME);

const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_ENDPOINT,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Book, User],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const AppDataSource = new DataSource(options);

const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    return AppDataSource;
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
};

export const dataSource = initializeDataSource();
