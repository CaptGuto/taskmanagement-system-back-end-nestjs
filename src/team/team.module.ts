import { Module } from "@nestjs/common";
import { TeamService } from "./usecases/team.service";
import { TeamController } from "./controllers/team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./persistence/team.entity";
import { TeamRepository } from "./persistence/team.repository";

@Module({
  exports: [TeamService, TeamRepository],
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService, TeamRepository, TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
TeamService;
