import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import Promise, { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class userRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User> {
    const someuser = new User();
    someuser.email = "someemail";
    someuser.password = "somepassword";
    someuser.created_at = new Date();
    someuser.updated_at = new Date();
    return await someuser;
  }
}
