import { Body, Controller, Injectable, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/Guards/auth.guard";
// import { AuthGuard } from "../../../auth/Guards/auth.guard";
import { SendTeamInvitationDto } from "src/notification/usecase/invitation/dto/send-team-invitation.dto";
import { InvitationService } from "src/notification/usecase/invitation/invitation.service";
import { User } from "src/user/persistence/user/user.entity";
import { CurrentUser } from "src/user/utility/decorators/current-user.decorator";

@Injectable()
@Controller("invitation")
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  //A Guard to check if the user sending the invite is the admin/creator of the team or the project sending the invitation for
  @UseGuards(AuthGuard)
  @Post("/send-team-invitation")
  async sendInvitation(
    @Body() info: SendTeamInvitationDto,
    @CurrentUser() user: User,
  ) {
    return await this.invitationService.sendInvitation(info, user);
  }
}
