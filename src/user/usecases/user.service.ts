import { Injectable } from "@nestjs/common";
import { userRepository } from "../persistence/user/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: userRepository) {}

  async getAll(): Promise<any> {
    return await this.userRepository.getAll();
  }
}
