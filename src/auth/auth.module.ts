import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/usecases/user.service";
import { UserModule } from "src/user/user.module";
import { PasswordAuth } from "./password.auth";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECREATE,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, UserService, PasswordAuth],
  controllers: [AuthController],
})
export class AuthModule {}
