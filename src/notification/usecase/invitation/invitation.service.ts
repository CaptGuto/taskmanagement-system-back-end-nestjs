import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InvitationRepository } from "../../persistence/invitation/invitation.repository";
import { SendTeamInvitationDto } from "./dto/send-team-invitation.dto";
import { UserService } from "src/user/usecases/user.service";
import { TeamService } from "src/team/usecases/team.service";
import { User } from "src/user/persistence/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Invitation } from "src/notification/persistence/invitation/invitation.entity";

@Injectable()
export class InvitationService {
  constructor(
    private readonly invitationRepository: InvitationRepository,
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly jwtService: JwtService,
  ) {}

  async sendInvitation(info: SendTeamInvitationDto, inviterUser: User) {
    const {
      invitedUserEmail,
      inivitationTeamId,
      invitationType,
      invitationMessage,
    } = info;
    const invitedUser = await this.userService.getUserByEmail(invitedUserEmail);

    const invitationToken = await this.createToken(
      invitedUser.email,
      inviterUser.id,
      inivitationTeamId,
    );
    // Todo: Encrypt the token before sotring it

    if (!invitedUser) {
      throw new NotFoundException(
        "This user has not been registered would you like to invite them via an email",
      );
    }

    const invitationTeam =
      await this.teamService.getTeamWithId(inivitationTeamId);

    if (!invitationTeam) {
      throw new NotFoundException("This team does not exist");
    }

    if (await this.invitationExists(inivitationTeamId, invitedUser.id)) {
      return new BadRequestException("Invitation already sent");
    }

    return this.invitationRepository.createInvitation(
      invitationType,
      invitationMessage,
      inviterUser,
      invitedUser,
      invitationTeam,
      invitationToken,
    );
  }

  async createToken(
    invitedUserEmail: string,
    inviterUserId: number,
    invitedTeamId,
  ): Promise<string> {
    const tokenPyload = {
      invited: invitedUserEmail,
      invity: inviterUserId,
      team: invitedTeamId,
    };

    const access_token = await this.jwtService.signAsync(tokenPyload);
    return access_token;
  }

  async getAllInvitation(user: User): Promise<Invitation[]> {
    return this.invitationRepository.getInvitatinByUser(user);
  }

  async checkToken(token: string, currentUser: User): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECREATE,
      });

      if (payload.invited === currentUser.email) {
        return true;
      } else {
        return false;
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  async acceptInvitation(invitationId: number, token: string, user: User) {
    if (this.checkToken(token, user)) {
      return this.invitationRepository.acceptInvitation(invitationId);
    }
  }

  async invitationExists(
    teamId: number,
    invitedUserId: number,
  ): Promise<Boolean> {
    const invitation =
      await this.invitationRepository.getInvitationByTeamIdandInvitedUserId(
        teamId,
        invitedUserId,
      );

    return !!invitation;
  }
}
