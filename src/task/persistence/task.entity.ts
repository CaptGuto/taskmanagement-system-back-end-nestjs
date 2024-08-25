import {
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => User, (user) => user.task)
  user: User;

  //The relation to associate all the users assigned to a task
  @ManyToMany(() => User, (user) => user.tasks_assigned_to_user)
  @JoinTable({ name: "users_assigned_to_task" })
  users_assigned_to_task: User[];
}
