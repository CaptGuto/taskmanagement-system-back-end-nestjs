import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/usecases/user.service";
import { UserModule } from "src/user/user.module";
import { PasswordAuth } from "./password.auth";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECREATE } from "config/jwt.screate";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECREATE.JWT_SECREATE,
      signOptions: { expiresIn: "1200s" },
    }),
  ],
  providers: [AuthService, UserService, PasswordAuth],
  controllers: [AuthController],
})
export class AuthModule {}
