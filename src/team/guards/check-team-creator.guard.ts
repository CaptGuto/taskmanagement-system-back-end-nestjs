import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TeamService } from "../usecases/team.service";

@Injectable()
export class CheckTeamCreatorGuard implements CanActivate {
  constructor(private readonly teamService: TeamService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const team_id = request.params.teamId;

    const team = await this.teamService.getTeamWithId(team_id, ["admins"]);

    if (!team) {
      throw new NotFoundException(`Team with id ${team_id} not found`);
    }

    if (team.createdBy === request.currentUser["id"]) {
      return true;
    }

    return false;
  }
}
