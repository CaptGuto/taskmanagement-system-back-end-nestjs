import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_TYPE as "postgres",
  host: process.env.HOST_NAME,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
};
