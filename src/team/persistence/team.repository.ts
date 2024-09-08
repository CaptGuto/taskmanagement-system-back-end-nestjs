import { Injectable } from "@nestjs/common";
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
}
