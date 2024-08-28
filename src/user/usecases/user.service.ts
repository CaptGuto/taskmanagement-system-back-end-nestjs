import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../persistence/user/user.repository";
import { User } from "../persistence/user/user.entity";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { PasswordAuth } from "src/auth/password.auth";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly passwordAuth: PasswordAuth,
  ) {}

  async getAll(): Promise<any> {
    return await this.userRepository.getAll();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.getaUserWithEmail(email);
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.getaUserWithId(id);
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
    const user = await this.getUserByEmail(info.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }

    info.password = await this.passwordAuth.generateHashPassword(info.password);
    return this.createUser(info);
  }

  async updateUser(info: Partial<UpdateUserProfileDto>, userId: number) {
    return this.userRepository.updateUser(info, userId);
  }

  async findUsersWithId(userIds: number[]): Promise<User[]> {
    return await this.userRepository.findUsersWithIds(userIds);
  }
}
