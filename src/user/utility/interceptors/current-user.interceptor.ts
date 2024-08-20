import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "src/user/persistence/user/user.entity";

import { UserService } from "src/user/usecases/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user) {
      const currentUser = await this.userService.getUserById(user.id);
      if (currentUser) {
        request.currentUser = currentUser;
      }
    }

    return next.handle();
  }
}
