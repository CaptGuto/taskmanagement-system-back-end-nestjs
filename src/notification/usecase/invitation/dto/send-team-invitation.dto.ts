import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { InvitationType } from "src/notification/common/enums/invitation-type.enum";

export class SendTeamInvitationDto {
  @IsNotEmpty()
  @IsEnum(InvitationType)
  invitationType: InvitationType;

  @IsString()
  invitationMessage: string;

  @IsEmail()
  @IsNotEmpty()
  invitedUserEmail: string;

  @IsNotEmpty()
  inivitationTeamId: number;
}
