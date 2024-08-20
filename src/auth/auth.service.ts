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
import { JwtService } from "@nestjs/jwt";
import { SignUpResponseDto } from "./dto/signUpResponse.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordAuth: PasswordAuth,
    private jwtService: JwtService,
  ) {}

  async validateUser(info: SignInDto) {
    const user = await this.userService.getUserByEmail(info.email);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }
    const [salt, storedHash] = user.password.split(".");
    const recived_password = await this.passwordAuth.generateHashPassword(
      info.password,
      salt,
    );

    if (user.password === recived_password) {
      return user;
    }

    return null;
  }
  async signIn(info: SignInDto): Promise<User> {
    const user = await this.validateUser(info);
    if (!user) {
      throw new UnauthorizedException("wrong password");
    }

    const tokenPyload = {
      id: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(tokenPyload);
    user.access_token = access_token;

    return user;
  }

  // The error was that I was returning a string instead of a promise
  // I was also using the wrong type for the scrypt function
}
