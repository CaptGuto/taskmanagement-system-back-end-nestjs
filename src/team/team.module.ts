import { Module } from "@nestjs/common";
import { TeamService } from "./usecases/team.service";
import { TeamController } from "./controllers/team.controller";

@Module({
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
TeamService;
