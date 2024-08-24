import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "../usecase/task.service";
import { CreateTaskDto } from "../usecase/dto/create-task.dto";
import { AuthGuard } from "../../auth/auth.guard";
import {
  CurrentUser,
  CurrentUserId,
} from "src/user/utility/decorators/current-user.decorator";
import { User } from "src/user/persistence/user/user.entity";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post("create")
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() current_user: User,
  ) {
    return this.taskService.createTask(body, current_user);
  }

  @UseGuards(AuthGuard)
  @Get("get-all")
  async getAllTasks(@CurrentUser() user: User) {
    return this.taskService.getAllTasks(user);
  }
}
