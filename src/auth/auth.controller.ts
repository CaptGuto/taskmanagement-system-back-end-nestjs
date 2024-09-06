import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Injectable,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { SignUpDto } from "./dto/signUp.dto";
import { AuthService } from "./auth.service";
import { SerializeResponse } from "src/interceptor/serialize.interceptor";
import { SignUpResponseDto } from "./dto/signUpResponse.dto";
import { SignInDto } from "./dto/signIn.dto";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("auth")
@SerializeResponse(SignUpResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signin")
  @ApiOkResponse({
    type: SignUpResponseDto,
    description: "Sign in successful",
  })
  signin(@Body() body: SignInDto): Promise<SignUpResponseDto> {
    return this.authService.signIn(body);
  }
}
