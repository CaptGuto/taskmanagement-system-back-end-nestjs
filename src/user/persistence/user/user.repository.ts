import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "./user.entity";
import Promise, {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { UpdateUserProfileDto } from "src/user/usecases/dto/update-user-profile.dto";

@Injectable()
export class UserRepository {
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

  async findUsersWithIds(userIds: number[]): Promise<User[]> {
    return await this.userRepository.find({
      where: { id: In(userIds) },
    });
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

  async updateUser(
    info: Partial<UpdateUserProfileDto>,
    userId: number,
  ): Promise<User> {
    // Todo: Implement User update
    const user = await this.getaUserWithId(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    Object.assign(user, info);

    return this.userRepository.save(user);
  }
}
