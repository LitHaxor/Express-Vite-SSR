import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskEntity } from "./task.entity";

export class UserRole {
  static ADMIN = "admin";
  static USER = "user";
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    length: 100,
  })
  email!: string;

  @Column({
    length: 100,
  })
  password!: string;

  @Column({
    enum: [UserRole.ADMIN, UserRole.USER],
    default: UserRole.USER,
  })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks!: TaskEntity[];
}
