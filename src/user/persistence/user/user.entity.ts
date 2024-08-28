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

  @OneToMany(() => Task, (task) => task.user)
  tasks_of_user: Task[];

  //The relation to associate all the tasks assigned to a user
  @ManyToMany(() => Task, (task) => task.users_assigned_to_task)
  tasks_assigned_to_user: Task[];
}
