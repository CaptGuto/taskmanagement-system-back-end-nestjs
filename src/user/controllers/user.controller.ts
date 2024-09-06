import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "../usecases/user.service";
import { SignUpDto } from "src/auth/dto/signUp.dto";
import { SerializeResponse } from "src/interceptor/serialize.interceptor";
import { SignUpResponseDto } from "src/auth/dto/signUpResponse.dto";
import { AuthGuard } from "src/auth/Guards/auth.guard";
import {
  CurrentUser,
  CurrentUserId,
} from "../utility/decorators/current-user.decorator";
import { User } from "../persistence/user/user.entity";
import { CurrentUserInterceptor } from "../utility/interceptors/current-user.interceptor";
import { UserResponeseDto } from "../usecases/dto/user-response.dto";
import { UpdateUserProfileDto } from "../usecases/dto/update-user-profile.dto";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @SerializeResponse(SignUpResponseDto)
  @Post("signup")
  @ApiCreatedResponse({ type: SignUpResponseDto, status: 200 })
  async signUp(@Body() info: SignUpDto): Promise<SignUpResponseDto> {
    return this.userService.signup(info);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getMyInformation() {
    return "your Information is visible";
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  @Get("/getuserinfo")
  @SerializeResponse(UserResponeseDto)
  getUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch("update-user-info")
  updateUser(@Body() info: UpdateUserProfileDto, @CurrentUserId() id: number) {
    return this.userService.updateUser(info, id);
  }
}
