import { IsNotEmpty } from "class-validator";

export class CreateTeamDto {
  @IsNotEmpty()
  teamName: string;

  teamDescription: string;

  // TeamMembers: number[]
}
