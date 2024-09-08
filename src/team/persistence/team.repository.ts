import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Repository } from "typeorm";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  async create(name: string, description: string, user: User) {
    const team = this.teamRepository.create({
      teamName: name,
      teamDescription: description,
    });

    team.user = user;

    if (!team) {
      throw new Error("Unable to create team"); //Change the throwen error here to more specific
    }

    return await this.teamRepository.save(team);
  }

  async getATeamWithId(
    teamId: number,
    relations: string[] = [],
  ): Promise<Team> {
    return await this.teamRepository.findOne({
      where: { teamId: teamId },
      relations,
    });
  }

  async updateTeam(info: Partial<Team>, teamId: number) {
    const team = await this.getATeamWithId(teamId);

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    Object.assign(team, info);
    return await this.teamRepository.save(team);
  }

  async archiveTeam(teamId: number, archiverId: number) {
    const team = await this.getATeamWithId(teamId);

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    team.deletedAt = new Date();
    team.deletedBy = archiverId;

    return await this.teamRepository.save(team);
  }
}
