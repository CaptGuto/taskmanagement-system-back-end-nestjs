import { Expose } from "class-transformer";

export class SignUpResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  access_token: string;
}
