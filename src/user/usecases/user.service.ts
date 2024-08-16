import { BadRequestException, Injectable } from "@nestjs/common";
import { userRepository } from "../persistence/user/user.repository";
import { User } from "../persistence/user/user.entity";
import { SignUpDto } from "src/auth/dto/signUp.dto";

@Injectable()
export class UserService {
  constructor(private userRepository: userRepository) {}

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
}
