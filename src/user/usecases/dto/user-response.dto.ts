import { Expose } from "class-transformer";

export class UserResponeseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  fname: string;

  @Expose()
  laneme: string;

  @Expose()
  password: string;
}
