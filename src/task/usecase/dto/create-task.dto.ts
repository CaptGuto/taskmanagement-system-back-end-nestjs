import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "src/task/utility/status.enum";
import { TaskPriority } from "src/task/utility/task-priority.enum";

export class CreateTaskDto {
  @Expose()
  @IsNotEmpty()
  task_title: string;

  @Expose()
  @IsNotEmpty()
  task_description: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @Expose()
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priorty: TaskPriority;

  @Expose()
  @IsNotEmpty()
  due_date: Date;
}
