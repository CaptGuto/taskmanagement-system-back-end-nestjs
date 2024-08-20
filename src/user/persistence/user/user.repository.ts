import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import Promise, { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "src/auth/dto/signUp.dto";

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

  async getaUserWithEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }
  async getaUserWithId(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async createUser(
    fname: string,
    lname: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = this.userRepository.create({ fname, lname, email, password });
    return await this.userRepository.save(user);
  }
}
