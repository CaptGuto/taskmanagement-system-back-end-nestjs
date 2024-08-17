import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { UserService } from "../usecases/user.service";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { PasswordAuth } from "src/auth/password.auth";
import { Serialize } from "src/interceptor/serialize.interceptor";
import { SignUpResponseDto } from "src/auth/dto/signUpResponse.dto";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordAuth: PasswordAuth,
  ) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Serialize(SignUpResponseDto)
  @Post("signup")
  async signUp(@Body() info: SignUpDto) {
    const user = await this.userService.getaUser(info.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }

    info.password = await this.passwordAuth.generateHashPassword(info.password);
    return this.userService.createUser(info);
  }
}
