import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "src/task/enums/status.enum";
import { TaskPriority } from "src/task/utility/task-priority.enum";

export class CreateTaskResponseDto {
  @ApiProperty()
  task_id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  task_title: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  task_description: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priorty: TaskPriority;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;
}
