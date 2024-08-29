import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TaskService } from "../usecase/task.service";
import { UserService } from "src/user/usecases/user.service";

@Injectable()
export class CheckAdminGuard implements CanActivate {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const task_id = request.params.taskId;

    const task = await this.taskService.getTaskWithId(task_id, ["user"]);
    const useri = await this.userService.getUserById(request.currentUser.id);
    if (!task) {
      throw new NotFoundException(`Task with id ${task_id} not found`);
    }
    const isCreator = task.createdBy === request.currentUser["id"];
    return isCreator;
  }
}
