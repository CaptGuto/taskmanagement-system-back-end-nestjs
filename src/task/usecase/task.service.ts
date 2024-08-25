import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../persistence/task.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  createTask(info: CreateTaskDto, Creater: User) {
    const { task_title, task_description, status, priorty, due_date } = info;

    return this.taskRepository.createTask(
      task_title,
      task_description,
      status,
      priorty,
      due_date,
      Creater,
    );
  }

  async getAllTasks(user: User) {
    return await this.taskRepository.getAllTasks(user);
  }

  async assignUserToTask(taskId: number, assignedUserId: number[]) {
    return await this.taskRepository.assignUsetToTask(taskId, assignedUserId);
  }
}
