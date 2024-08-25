import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./usecases/user.service";
import { User } from "./persistence/user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./persistence/user/user.repository";
import { PasswordAuth } from "src/auth/password.auth";
import { CurrentUserInterceptor } from "./utility/interceptors/current-user.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, UserRepository],
  providers: [
    UserService,
    UserRepository,
    PasswordAuth,
    CurrentUserInterceptor,
  ],
  controllers: [UserController],
})
export class UserModule {}
