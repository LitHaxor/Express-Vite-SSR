// task.dto.ts
import { IsNotEmpty, IsOptional, IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../../entitiy/task.entity";

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;

  userId?: string;
}
