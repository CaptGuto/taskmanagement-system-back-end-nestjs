import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TaskService } from "../usecase/task.service";
import { CreateTaskDto } from "../usecase/dto/create-task.dto";
import { AuthGuard } from "../../auth/auth.guard";
import { CurrentUser } from "src/user/utility/decorators/current-user.decorator";
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

  //todo: this needs a guard to check if the user is the creator/admin of the task
  //and should it not allow an assignUser to task with an empty
  @UseGuards(AuthGuard)
  @Post("/:taskId/assign-user")
  async assignUserToTask(
    @Param() taskId: number,
    @Body() assigneUserIds: number[],
  ) {
    // todo here a check to see if the sent body is an array of userIds

    return this.taskService.assignUserToTask(
      taskId["taskId"],
      assigneUserIds["userIds"],
    );
  }
}
