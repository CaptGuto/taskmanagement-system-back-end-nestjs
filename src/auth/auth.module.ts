import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/usecases/user.service";
import { UserModule } from "src/user/user.module";
import { userRepository } from "src/user/persistence/user/user.repository";

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
