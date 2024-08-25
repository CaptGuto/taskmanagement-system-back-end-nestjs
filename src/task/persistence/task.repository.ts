import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { In, Repository } from "typeorm";
import { TaskPriority } from "../utility/task-priority.enum";
import { TaskStatus } from "../utility/status.enum";
import { User } from "src/user/persistence/user/user.entity";
import { UserService } from "src/user/usecases/user.service";
import { CreateTaskDto } from "../usecase/dto/create-task.dto";

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

  async getATaskWithId(taskId: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { task_id: taskId } });
  }

  async getAllTasks(user: User) {
    const tasks = await this.taskRepository.findBy(user.task);
    return tasks;
  }

  async assignUsetToTask(taskId: number, assignedUserId: number[]) {
    // return await this.taskRepository
    //   .createQueryBuilder()
    //   .relation(Task, "users_assigned_to_task")
    //   .of(taskId)
    //   .add(assignedUserId);
    //I will use this when I get very good with QueryBuilders
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
    const user = await this.getATaskWithId(taskId);
    if (!user) {
      throw new NotFoundException(`User with id ${taskId} not found`);
    }

    Object.assign(user, info);

    return this.taskRepository.save(user);
  }
}
