import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../usecases/user.service";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { PasswordAuth } from "src/auth/password.auth";
import { Serialize } from "src/interceptor/serialize.interceptor";
import { SignUpResponseDto } from "src/auth/dto/signUpResponse.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "../utility/decorators/current-user.decorator";
import { User } from "../persistence/user/user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Serialize(SignUpResponseDto)
  @Post("signup")
  async signUp(@Body() info: SignUpDto) {
    return this.userService.signup(info);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getMyInformation() {
    return "your Information is visible";
  }

  @UseGuards(AuthGuard)
  @Get("/getuserinfo")
  getUserInfo(@CurrentUser() user: User) {
    return user;
  }
}
