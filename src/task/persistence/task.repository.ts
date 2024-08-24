import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskPriority } from "../utility/task-priority.enum";
import { TaskStatus } from "../utility/status.enum";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createTask(
    task_title: string,
    task_description: string,
    status: TaskStatus,
    priorty: TaskPriority,
    due_date: Date,
    created_by: User,
  ) {
    const task = this.taskRepository.create({
      task_title,
      task_description,
      status,
      priorty,
      due_date,
    });

    task.user = created_by;
    return await this.taskRepository.save(task);
  }

  async getAllTasks(user: User) {
    const tasks = await this.taskRepository.findBy(user.task);
    return tasks;
  }
}
