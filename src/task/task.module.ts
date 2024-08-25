import { Module } from "@nestjs/common";
import { TaskService } from "./usecase/task.service";
import { TaskController } from "./controllers/task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./persistence/task.entity";
import { TaskRepository } from "./persistence/task.repository";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
