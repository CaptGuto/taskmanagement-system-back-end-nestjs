import { Injectable } from "@nestjs/common";
import { TeamRepository } from "../persistence/team.repository";

@Injectable()
export class TeamService {
  constructor(private readonly teamRepoistory: TeamRepository) {}
}
