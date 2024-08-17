import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/usecases/user.service";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "src/user/persistence/user/user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { PasswordAuth } from "./password.auth";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordAuth: PasswordAuth,
  ) {}

  async signIn(info: SignInDto) {
    const user = await this.userService.getaUser(info.email);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }
    const [salt, storedHash] = user.password.split(".");
    const recived_password = await this.passwordAuth.generateHashPassword(
      info.password,
      salt,
    );

    if (user.password !== recived_password) {
      throw new UnauthorizedException("wrong password");
    }

    return user;
  }

  // The error was that I was returning a string instead of a promise
  // I was also using the wrong type for the scrypt function
}
