import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/usecases/user.service";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(info: SignUpDto) {
    const user = await this.userService.getaUser(info.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }
    return this.userService.createUser(info);
  }
}
