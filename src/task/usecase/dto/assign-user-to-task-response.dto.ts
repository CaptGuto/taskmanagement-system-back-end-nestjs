import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { TaskStatus } from "src/task/enums/status.enum";
import { TaskPriority } from "src/task/utility/task-priority.enum";

export class AssignUserToTaskResponseDto {
  @ApiProperty()
  @Expose()
  task_id: number;

  @ApiProperty()
  @Expose()
  task_title: string;

  @ApiProperty()
  @Expose()
  users_assigned_to_task: number[];

  @ApiProperty()
  @Expose()
  task_description: string;

  @ApiProperty()
  @Expose()
  priorty: TaskPriority;

  @ApiProperty()
  @Expose()
  due_date: Date;
}
