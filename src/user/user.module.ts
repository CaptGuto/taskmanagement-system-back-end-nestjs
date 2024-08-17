import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./usecases/user.service";
import { User } from "./persistence/user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userRepository } from "./persistence/user/user.repository";
import { PasswordAuth } from "src/auth/password.auth";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, userRepository],
  providers: [UserService, userRepository, PasswordAuth],
  controllers: [UserController],
})
export class UserModule {}
