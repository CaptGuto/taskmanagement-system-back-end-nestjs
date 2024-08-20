import { Expose } from "class-transformer";
import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserProfileDto {
  @Expose()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Expose()
  fname: string;

  @IsOptional()
  @Expose()
  laneme: string;
}
