import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskStatus } from "../enums/status.enum";
import { TaskPriority } from "../utility/task-priority.enum";
import { User } from "src/user/persistence/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  task_id: number;

  @ApiProperty()
  @Column()
  task_title: string;

  @ApiProperty()
  @Column()
  task_description: string;

  @ApiProperty()
  @Column()
  status: TaskStatus;

  @ApiProperty()
  @Column()
  priorty: TaskPriority;

  @ApiProperty()
  @Column({ type: "timestamptz" })
  due_date: Date;

  @ApiProperty()
  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
  })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
  })
  updated_at: Date;

  @ApiProperty()
  @Column({ name: "created_by" })
  createdBy: number;

  @DeleteDateColumn({ nullable: true, name: "deleted_at" })
  deletedAt?: Date;

  @Column({ nullable: true, name: "deleted_by" })
  deletedBy?: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.tasks_of_user)
  @JoinColumn({ name: "created_by" })
  user: User;

  //The relation to associate all the users assigned to a task
  @ApiProperty({ type: () => [User] })
  @ManyToMany(() => User, (user) => user.tasks_assigned_to_user)
  @JoinTable({ name: "users_assigned_to_task" })
  users_assigned_to_task: User[];
}
