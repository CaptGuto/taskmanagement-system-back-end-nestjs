import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { In, Repository } from "typeorm";
import { TaskPriority } from "../utility/task-priority.enum";
import { TaskStatus } from "../enums/status.enum";
import { User } from "src/user/persistence/user/user.entity";
import { UserService } from "src/user/usecases/user.service";
import { CreateTaskDto } from "../usecase/dto/create-task.dto";

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
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

  async getATaskWithId(
    taskId: number,
    relations: string[] = [],
  ): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { task_id: taskId },
      relations,
    });
  }

  async getAllTasks(user: User, dateRange: DateRange = {}) {
    const { startDate, endDate } = dateRange;
    if (!startDate && !endDate) {
      return await this.taskRepository.findBy(user.tasks_of_user);
    }
    const result = await this.taskRepository
      .createQueryBuilder("task")
      .where("task.due_date BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany();

    return result;
  }

  async assignUsetToTask(taskId: number, assignedUserId: number[]) {
    const task = await this.taskRepository.findOne({
      where: { task_id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    const users = await this.userService.findUsersWithId(assignedUserId);

    if (users.length !== assignedUserId.length) {
      throw new NotFoundException(`One or more user not found`);
      //todo: need to get which user is not found and throw an error for it but assign the remaing found users
    }

    task.users_assigned_to_task = users;

    return await this.taskRepository.save(task);
  }

  async updateTask(taskId, info: Partial<CreateTaskDto>): Promise<Task> {
    const task = await this.getATaskWithId(taskId);
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    Object.assign(task, info);

    return this.taskRepository.save(task);
  }

  async archiveTask(taskId: number, archivedBy: User) {
    const task = await this.getATaskWithId(taskId);

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    task.deletedBy = archivedBy.id;
    task.deletedAt = new Date();

    return this.taskRepository.save(task);
  }

  async completeTask(taskid: number) {
    const task = await this.getATaskWithId(taskid);

    if (!task) {
      throw new NotFoundException(`Task with id ${taskid} not found`);
    }

    task.status = TaskStatus.Done;

    return await this.taskRepository.save(task);
  }
}
