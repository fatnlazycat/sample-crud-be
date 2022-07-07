import { DataSource } from "typeorm";
import { Note } from "./entity/note";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ec2-52-49-120-150.eu-west-1.compute.amazonaws.com",
  port: 5432,
  username: "klkaymvtmbmfrf",
  password: "21a2b98b82146dd0a9cc588e52f89fa29fa2f891fd8569a311f08a9257850324",
  database: "ddd9sgihgt6ga8",
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: true,
  entities: [Note],
  subscribers: [],
  migrations: [],
})