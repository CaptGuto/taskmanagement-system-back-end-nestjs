import { User } from "src/user/persistence/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn({ name: "team_id" })
  teamId: number;

  @Column({ name: "team_name" })
  teamName: string;

  @Column({ name: "team_description", nullable: true })
  teamDescription: string;

  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
  })
  updated_at: Date;

  // Add created by as a column

  // @Column({ name: "team_leader" })
  // teamLeader: number; //later to be changed to a relationship with user

  @ManyToOne(() => User, (user) => user.myTeams)
  teamLeader: User;

  // @ManyToMany(() => ...)
  // team members: a many to many relationship with user

  // @ManyToMany ...
  // project assigned to team: a many to many relationship with project
}
