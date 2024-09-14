import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from "typeorm";
import { InvitationType } from "../../common/enums/invitation-type.enum";
import { CommonEntity } from "src/Common/Entity/common.entity";
import { User } from "src/user/persistence/user/user.entity";
import { Team } from "src/team/persistence/team.entity";
import { ApiProperty } from "@nestjs/swagger";
import { InvitationStatus } from "src/notification/common/enums/invitation-status.enum";

@Entity()
export class Invitation extends CommonEntity {
  @ApiProperty()
  @Column({ name: "invitation_type" })
  invitationType: InvitationType; //team, project, user defines the kind of invitation this is to present it as so in the front properly

  @ApiProperty()
  @Column({ name: "invitation_message" })
  invitationMessage: string;

  @ApiProperty()
  @Column({ name: "invited_user_id" })
  invitedUserId: number;

  @ApiProperty()
  @Column({
    name: "invitation_team_id",
    nullable: true,
  })
  invitationTeamId: number;

  @ApiProperty()
  @Column({ name: "inviter_user_id" })
  inviterUserId: number;

  @ApiProperty()
  @Column({ name: "invitation_status" })
  invitationStatus: InvitationStatus;

  @ApiProperty()
  @Column({ name: "inivitation_token" }) //Be sure to encrypt the token before storing it
  invitationToken: string;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: "inviter_user_id",
  })
  inviterUser: User;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: "invited_user_id",
  })
  invitedUser: User;

  @ManyToOne((type) => Team)
  @JoinColumn({
    name: "invitation_team_id",
  })
  invitationTeam: Team;

  // @ManyToOne(type => Project) //TODO: After Project Module is created!!
}
