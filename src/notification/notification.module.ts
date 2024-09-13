import { Module } from "@nestjs/common";
import { NotificationService } from "./usecase/notification/notification.service";
import { NotificationController } from "./controllers/notification/notification.controller";
import { InvitationController } from "./controllers/invitation/invitation.controller";
import { InvitationService } from "./usecase/invitation/invitation.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/usecases/user.service";
import { InvitationRepository } from "./persistence/invitation/invitation.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Invitation } from "./persistence/invitation/invitation.entity";
import { PasswordAuth } from "src/auth/password.auth";
import { TeamModule } from "src/team/team.module";
import { TeamService } from "src/team/usecases/team.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    UserModule,
    TeamModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECREATE,
      signOptions: { expiresIn: "3d" },
    }),
  ],
  providers: [
    NotificationService,
    InvitationService,
    UserService,
    InvitationRepository,
    PasswordAuth,
    TeamService,
  ],
  controllers: [NotificationController, InvitationController],

  exports: [TypeOrmModule],
})
export class NotificationModule {}
