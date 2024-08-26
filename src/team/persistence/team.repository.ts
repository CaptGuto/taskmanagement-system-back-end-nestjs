import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}
}
