import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { Favorite } from "./entity/Favorite";
import { config } from "dotenv";
import { validateEnvVars } from "./utils/env";

const requiredEnvVars = [
  "DB_PORT",
  "DB_ENDPOINT",
  "DB_NAME",
  "DB_USERNAME",
  "DB_PASSWORD",
];

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
config({ path: envPath });

validateEnvVars(requiredEnvVars);

const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_ENDPOINT,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [Book, User, Favorite],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const fixtureOptions: DataSourceOptions = {
  ...options,
  synchronize: true,
};

export const FixtureDataSource = new DataSource(fixtureOptions);

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
