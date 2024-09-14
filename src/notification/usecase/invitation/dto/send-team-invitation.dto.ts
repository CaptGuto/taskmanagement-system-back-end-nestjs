import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { InvitationType } from "src/notification/common/enums/invitation-type.enum";

export class SendTeamInvitationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InvitationType)
  invitationType: InvitationType;

  @ApiProperty()
  @IsString()
  invitationMessage: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  invitedUserEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  inivitationTeamId: number;
}
