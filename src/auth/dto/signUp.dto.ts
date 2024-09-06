import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  fname: string;

  @ApiProperty()
  @IsNotEmpty()
  lname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
