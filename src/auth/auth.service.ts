import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/usecases/user.service";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "src/user/persistence/user/user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(info: SignUpDto) {
    const user = await this.userService.getaUser(info.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }

    info.password = await this.generateHashPassword(info.password);
    return this.userService.createUser(info);
  }

  async signIn(info: SignInDto) {
    const user = await this.userService.getaUser(info.email);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }
    const [salt, storedHash] = user.password.split(".");
    const recived_password = await this.generateHashPassword(
      info.password,
      salt,
    );

    if (user.password === recived_password) {
      return user;
    } else {
      return new UnauthorizedException("Wrong password");
    }
  }

  // The error was that I was returning a string instead of a promise
  // I was also using the wrong type for the scrypt function
  async generateHashPassword(
    password: string,
    salt: string = randomBytes(8).toString("hex"),
  ): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return salt + "." + hash.toString("hex");
  }
}
