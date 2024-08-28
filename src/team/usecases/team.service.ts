import { Injectable } from "@nestjs/common";
import { TeamRepository } from "../persistence/team.repository";
import { CreateTeamDto } from "./dto/create-team.dto";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class TeamService {
  constructor(private readonly teamRepoistory: TeamRepository) {}

  async createTeam(info: CreateTeamDto, user: User) {
    const { teamName, teamDescription } = info;
    // add the team members in this data
    return await this.teamRepoistory.create(teamName, teamDescription, user);
  }
}
