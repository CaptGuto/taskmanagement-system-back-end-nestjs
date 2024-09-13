import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitation } from "./invitation.entity";
import { Repository } from "typeorm";
import { InvitationType } from "src/notification/common/enums/invitation-type.enum";
import { Team } from "src/team/persistence/team.entity";
import { User } from "src/user/persistence/user/user.entity";

@Injectable()
export class InvitationRepository {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  async createInvitation(
    invitationType: InvitationType,
    invitationMessage: string,
    inviterUser: User,
    invitedUser: User,
    inivitationTeam: Team,
    invitationToken: string,
  ) {
    const invitation = this.invitationRepository.create({
      invitationType,
      invitationMessage,
      invitationToken,
    });

    invitation.invitationTeam = inivitationTeam;
    invitation.invitedUser = invitedUser;
    invitation.inviterUser = inviterUser;

    invitation.createdBy = inviterUser.id;

    return await this.invitationRepository.save(invitation);
  }
}
