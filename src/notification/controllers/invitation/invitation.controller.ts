import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/Guards/auth.guard";
import { Invitation } from "src/notification/persistence/invitation/invitation.entity";
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
  // Todo: Check if the invitation for that specific team is sent or that the user has already been invited to the team
  @UseGuards(AuthGuard)
  @Post("/send-team-invitation")
  async sendInvitation(
    @Body() info: SendTeamInvitationDto,
    @CurrentUser() user: User,
  ) {
    return await this.invitationService.sendInvitation(info, user);
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: [Invitation],
  })
  @Get("/get-all-invitation")
  async getAllInvitation(
    @CurrentUser() currentUser: User,
  ): Promise<Invitation[]> {
    return this.invitationService.getAllInvitation(currentUser);
  }

  // @UseGuards(AuthGuard)
  // @Post("/accept-team-invitation")
  // async acceptInvitation(info: ) {
  //   return this.invitationService.acceptInvitation();
  // }
}
