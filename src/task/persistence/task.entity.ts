import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskStatus } from "../utility/status.enum";
import { TaskPriority } from "../utility/task-priority.enum";
import { User } from "src/user/persistence/user/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column()
  task_title: string;

  @Column()
  task_description: string;

  @Column()
  status: TaskStatus;

  @Column()
  priorty: TaskPriority;

  @Column()
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @Column({name: "created_by"})
  // createdBy : number

  // @Column({name: 'project_id', nullable: true})
  // projectId : any //Later update this to a project entity

  // @Column({name: 'assigned_to', nullable: true})
  // assigned_to: User[] //Create a realationship here m:m

  // @OneToOne((type) => User)
  // @JoinColumn({ name: 'created_by'})
  // created_by_user: User

  @ManyToOne(() => User, (user) => user.task)
  user: User;

  // @ManyToMany(() => User, (user) => user.task)
  // @JoinColumn({ name: 'assigned_to' })
  // user: User //Create a realationship here 1:m
}
