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
import {
  Serialize,
  SerializeInterceptor,
} from "src/interceptor/serialize.interceptor";
import { SignUpResponseDto } from "./dto/signUpResponse.dto";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
@Serialize(SignUpResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signin")
  signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post("/signup")
  signup(@Body() body: SignUpDto) {
    const { fname, lname, email, password } = body;

    return this.authService.signUp(body);
  }
}
