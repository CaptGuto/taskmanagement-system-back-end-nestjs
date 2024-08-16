import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { SignUpDto } from "./dto/signUp.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signup(@Body() body: SignUpDto) {
    const { fname, lname, email, password } = body;

    return this.authService.signUp(body);
  }
}
