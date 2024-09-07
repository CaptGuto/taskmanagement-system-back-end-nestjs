import { BadRequestException, Injectable } from "@nestjs/common";
import { DateRange, TaskRepository } from "../persistence/task.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { User } from "src/user/persistence/user/user.entity";
import { Task } from "../persistence/task.entity";
import { FiltersForDateEnum } from "../enums/filters-for-date.enum";
import * as moment from "moment";

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

  async getAllTasks(user: User, filterBy?: FiltersForDateEnum) {
    if (!filterBy) {
      return await this.taskRepository.getAllTasks(user);
    }

    const filterByEnum = String(filterBy);
    const filters = {
      [FiltersForDateEnum.TODAY]: [
        moment().startOf("day").toDate(),
        moment().endOf("day").toDate(),
      ],
      [FiltersForDateEnum.TOMORROW]: [
        moment().add(1, "days").startOf("day").toDate(),
        moment().add(1, "days").endOf("day").toDate(),
      ],
      [FiltersForDateEnum.THIS_WEEK]: [
        moment().startOf("week").toDate(),
        moment().endOf("week").toDate(),
      ],
    };
    const [startDate, endDate] = filters[filterByEnum];
    const dateRange = { startDate, endDate };
    return await this.taskRepository.getAllTasks(user, dateRange);
  }

  async assignUserToTask(taskId: number, assignedUserId: number[]) {
    const returnedValue = await this.taskRepository.assignUsetToTask(
      taskId,
      assignedUserId,
    );

    if (!returnedValue) {
      throw new BadRequestException("Task assignment failed");
    }

    const updatedTask = returnedValue;

    return {
      ...updatedTask,
      users_assigned_to_task: updatedTask.users_assigned_to_task.map(
        (user) => user.id,
      ),
    };
  }
  async deleteTask(taskId: number, user: User) {
    return this.taskRepository.archiveTask(taskId, user);
  }

  async completeTask(taskId: number) {
    return this.taskRepository.completeTask(taskId);
  }
}
