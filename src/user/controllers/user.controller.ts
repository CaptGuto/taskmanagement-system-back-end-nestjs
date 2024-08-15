import { Controller, Get } from "@nestjs/common";
import { UserService } from "../usecases/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
