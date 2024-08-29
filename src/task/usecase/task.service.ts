import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../persistence/task.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { User } from "src/user/persistence/user/user.entity";
import { Task } from "../persistence/task.entity";

// Tell the getTaskWithId function to return the user as well if set to true
type GetTaskByIdProperties = {
  getUser: boolean;
};

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

  async getTaskWithId(
    taskId: number,
    // filter: GetTaskByIdProperties = { getUser: false },
    relations: string[],
  ): Promise<Task> {
    // if (filter.getUser) {
    //   return await this.taskRepository.getAtaskbyIdWithUser(taskId);
    // }
    return await this.taskRepository.getATaskWithId(taskId, relations);
  }
  async updateTask(taskId, info: Partial<CreateTaskDto>): Promise<Task> {
    return await this.taskRepository.updateTask(taskId, info);
  }

  async getAllTasks(user: User) {
    return await this.taskRepository.getAllTasks(user);
  }

  async assignUserToTask(taskId: number, assignedUserId: number[]) {
    return await this.taskRepository.assignUsetToTask(taskId, assignedUserId);
  }

  async deleteTask(taskId: number, user: User) {
    return this.taskRepository.archiveTask(taskId, user);
  }

  async completeTask(taskId: number) {
    return this.taskRepository.completeTask(taskId);
  }
}
