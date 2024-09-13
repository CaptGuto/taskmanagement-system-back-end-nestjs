import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  task_id: number;

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

  @Column({ name: "created_by" })
  createdBy: number;

  @DeleteDateColumn({ nullable: true, name: "deleted_at" })
  deletedAt?: Date;

  @Column({ nullable: true, name: "deleted_by" })
  deletedBy?: number;
}
