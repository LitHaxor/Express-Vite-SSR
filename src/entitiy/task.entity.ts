import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

export enum TaskStatus {
  NOT_STARTED = "not_started",
  COMPLETE = "complete",
}

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    enum: TaskStatus,
  })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @Column()
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
