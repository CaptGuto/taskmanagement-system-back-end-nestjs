import { BadRequestException, Injectable } from "@nestjs/common";
import { userRepository } from "../persistence/user/user.repository";
import { User } from "../persistence/user/user.entity";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { PasswordAuth } from "src/auth/password.auth";

@Injectable()
export class UserService {
  constructor(
    private userRepository: userRepository,
    private readonly passwordAuth: PasswordAuth,
  ) {}

  async getAll(): Promise<any> {
    return await this.userRepository.getAll();
  }

  async getaUser(email: string): Promise<User> {
    const user = await this.userRepository.getaUser(email);
    return user;
  }

  async createUser(user: SignUpDto): Promise<User> {
    const { fname, lname, email, password } = user;
    const returnedUser = await this.userRepository.createUser(
      fname,
      lname,
      email,
      password,
    );
    if (returnedUser) return returnedUser;
    else throw new BadRequestException("user exists");
  }

  async signup(info: SignUpDto) {
    const user = await this.getaUser(info.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }

    info.password = await this.passwordAuth.generateHashPassword(info.password);
    return this.createUser(info);
  }
}
