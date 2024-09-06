import { Expose } from "class-transformer";
import { Task } from "../../../task/persistence/task.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { Team } from "src/team/persistence/team.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  fname: string;

  @Column({ nullable: false })
  lname: string;

  @Column({ nullable: false })
  password: string;

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

  access_token: string; //not part of entity

  @ApiProperty({ type: () => [Task] })
  @OneToMany(() => Task, (task) => task.user)
  tasks_of_user: Task[];

  //The relation to associate all the tasks assigned to a user
  @ApiProperty({ type: () => [Task] })
  @ManyToMany(() => Task, (task) => task.users_assigned_to_task)
  tasks_assigned_to_user: Task[];

  // A relation to team defining team leader user of a team
  @OneToMany(() => Team, (team) => team.teamLeader)
  myTeams: Team[];
}
