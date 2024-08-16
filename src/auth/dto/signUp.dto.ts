import { IsEmail, IsNotEmpty } from "class-validator";
export class SignUpDto {
  @IsNotEmpty()
  fname: string;

  @IsNotEmpty()
  lname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
