import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { SignUpResponseDto } from "src/auth/dto/signUpResponse.dto";

export function Serialize<T>(dto: new () => T) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(
      map((data: T) => {
        // const new_to_be_sent = {
        //   ...data,
        // }

        const transformedData = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });

        if (transformedData instanceof SignUpResponseDto) {
        }
        return transformedData;
      }),
    );
  }
}
