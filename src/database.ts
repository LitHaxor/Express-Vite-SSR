import { DataSource } from "typeorm";
import { DATABASE_URL } from "./config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "./entitiy/user.entity";
import { TaskEntity } from "./entitiy/task.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [UserEntity, TaskEntity],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  migrations: [],
});

export const configureDatabase = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error(
      "Error connecting to the database",
      JSON.stringify(error, null, 2)
    );
    throw error;
  }
};
