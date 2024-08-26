import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn({ name: "team_id" })
  teamId: number;

  @Column({ name: "team_name" })
  teamName: string;

  @Column({ name: "team_description" })
  teamDescription: string;

  @Column({ name: "team_leader" })
  teamLeader: number; //later to be changed to a relationship with user

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
}
