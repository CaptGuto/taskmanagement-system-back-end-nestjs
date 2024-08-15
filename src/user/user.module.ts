import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./usecases/user.service";

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
