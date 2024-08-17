import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class PasswordAuth {
  async generateHashPassword(
    password: string,
    salt: string = randomBytes(8).toString("hex"),
  ): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return salt + "." + hash.toString("hex");
  }
}
