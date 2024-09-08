import { Injectable } from "@nestjs/common";
import { TeamRepository } from "../persistence/team.repository";
import { CreateTeamDto } from "./dto/create-team.dto";
import { User } from "src/user/persistence/user/user.entity";
import { Team } from "../persistence/team.entity";

@Injectable()
export class TeamService {
  constructor(private readonly teamRepoistory: TeamRepository) {}

  async createTeam(info: CreateTeamDto, user: User) {
    const { teamName, teamDescription } = info;
    // add the team members in this data
    return await this.teamRepoistory.create(teamName, teamDescription, user);
  }

  async getTeamWithId(teamId: number, relations: string[]): Promise<Team> {
    return await this.teamRepoistory.getATeamWithId(teamId, relations);
  }

  async updateTeam(info: Partial<CreateTeamDto>, teamId: number) {
    return await this.teamRepoistory.updateTeam(info, teamId);
  }

  async deleteTeam(teamId: number, user: User) {
    return await this.teamRepoistory.archiveTeam(teamId, user.id);
  }
}
