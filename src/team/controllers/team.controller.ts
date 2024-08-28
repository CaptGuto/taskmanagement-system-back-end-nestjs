import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { TeamService } from "../usecases/team.service";
import { CreateTeamDto } from "../usecases/dto/create-team.dto";
import { AuthGuard } from "src/auth/Guards/auth.guard";
import { CurrentUser } from "src/user/utility/decorators/current-user.decorator";
import { User } from "src/user/persistence/user/user.entity";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  //Todo: Clean out the data returned after createtion
  @UseGuards(AuthGuard)
  @Post("create")
  async createTeam(@Body() info: CreateTeamDto, @CurrentUser() user: User) {
    const something = await this.teamService.createTeam(info, user);
    return something;
  }
}
