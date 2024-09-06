import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TaskService } from "../usecase/task.service";
import { CreateTaskDto } from "../usecase/dto/create-task.dto";
import { AuthGuard } from "../../auth/Guards/auth.guard";
import { CurrentUser } from "src/user/utility/decorators/current-user.decorator";
import { User } from "src/user/persistence/user/user.entity";
import { CheckAdminGuard } from "../guards/check-admin.guard";
import { FiltersForDateEnum } from "../enums/filters-for-date.enum";
import { Task } from "../persistence/task.entity";
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UpdateTaskDto } from "../usecase/dto/update-task.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //TODO: Clean out the response data what is returned. Only put the user id not the whole user object
  @UseGuards(AuthGuard)
  @Post("create")
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() current_user: User,
  ) {
    return this.taskService.createTask(body, current_user);
  }

  //Get tasks of a user
  @UseGuards(AuthGuard)
  @Get("get-all")
  @Get("tasks")
  async getAllTasks(
    @CurrentUser() user: User,
    @Query("filterDateBy") filterBy: FiltersForDateEnum,
  ) {
    if (
      Object.values(FiltersForDateEnum).includes(
        filterBy as FiltersForDateEnum,
      ) ||
      filterBy === undefined
    ) {
      return this.taskService.getAllTasks(user, filterBy);
    } else {
      throw new BadRequestException("Invalid filterBy value");
    }
  }

  //TODO: and should it not allow an assignUser to task with an empty
  //TODO: Clean out the response data what is returned.
  @UseGuards(AuthGuard)
  @Post("/:taskId/assign-user")
  async assignUserToTask(
    @Param("taskId") taskId: number,
    @Body() assigneUserIds: number[],
  ) {
    // todo here a check to see if the sent body is an array of userIds

    return this.taskService.assignUserToTask(taskId, assigneUserIds["userIds"]);
  }

  //Todo: Implement a guard to check if the user is the creator/admin of the task
  //Clean out the response data what is returned.
  @UseGuards(AuthGuard, CheckAdminGuard)
  @Patch("/:taskId/update")
  @ApiBody({
    type: UpdateTaskDto,
    description: "Partial porperties of Task, all fields are optional",
  })
  @ApiCreatedResponse({ type: () => Task })
  async updateTask(
    @Param("taskId") taskId: number,
    @Body() body: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, body);
  }

  // Delete Task
  @UseGuards(AuthGuard, CheckAdminGuard)
  @Delete("/:taskId/archive")
  async deleteTask(@CurrentUser() user: User, @Param("taskId") taskId: number) {
    return this.taskService.deleteTask(taskId, user);
  }

  @Patch("/:taskId/complete")
  async completeTask(@Param("taskId") taskId: number) {
    return this.taskService.completeTask(taskId);
  }
}

// TODO //
// A way to put a task in to doing mode and show who is doing it and
// the admin can see at what time they started doing it and if complete
// they can see at what time they finished doing the task
