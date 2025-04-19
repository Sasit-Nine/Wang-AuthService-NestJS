import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/users.entity';

// export enum EmpStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   PENDING = 'PENDING',
// }

// export enum UserCode {
//   ADMIN = 'ADMIN',
//   STAFF = 'STAFF',
// }

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id: number;

  @Column({ length: 6, unique: true })
  emp_code: string;

  @Column({ length: 30, nullable: true })
  emp_nickTH?: string;

  @Column({ length: 45, nullable: true })
  emp_nickEng?: string;

  @Column({ length: 45, nullable: true })
  emp_titleTH?: string;

  @Column({ length: 45, nullable: true })
  emp_titleEng?: string;

  @Column({ length: 45, nullable: true })
  emp_firstTH?: string;

  @Column({ length: 45, nullable: true })
  emp_firstEng?: string;

  @Column({ length: 45, nullable: true })
  emp_lastTH?: string;

  @Column({ length: 45, nullable: true })
  emp_lastEng?: string;

  @Column({ length: 45, nullable: true })
  emp_idCard?: string;

  @Column({ length: 45, nullable: true })
  emp_idVat?: string;

  @Column({ length: 45, nullable: true })
  vat_code?: string;

  @Column({ length: 45, nullable: true })
  emp_idSSO?: string;

  @Column({ length: 45, nullable: true })
  emp_sex?: string;

  @Column({ length: 45, nullable: true })
  emp_phone?: string;

  @Column({ length: 45, nullable: true })
  emp_email?: string;

  @Column({ length: 45, nullable: true })
  dep_code?: string;

  @Column({ length: 45, nullable: true })
  pos_code?: string;

  @Column({ length: 45, nullable: true })
  bank_code?: string;

  @Column({ length: 45, nullable: true })
  emp_bankNo?: string;

  @Column({ type: 'date', nullable: true })
  emp_birthdate?: Date;

  //   @Column({ type: 'enum', enum: EmpStatus, nullable: true })
  //   emp_status?: EmpStatus;

  //   @Column({ type: 'enum', enum: UserCode, nullable: true })
  //   user_code?: UserCode;

  @Column({ type: 'datetime', nullable: true })
  emp_datetime?: Date;

  @Column({ type: 'date', nullable: true })
  emp_dateWork?: Date;

  @Column({ type: 'date', nullable: true })
  emp_saveWork?: Date;

  @Column({ type: 'date', nullable: true })
  emp_exitWork?: Date;

  @Column({ length: 45, nullable: true })
  type_code?: string;

  @Column({ length: 45, nullable: true })
  pay_code?: string;

  //   @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  //   salary?: number;

  //   @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  //   ot_rate?: number;

  //   @Column({ length: 45, nullable: true })
  //   tax_code?: string;

  //   @Column({ length: 45, nullable: true })
  //   shift_code?: string;

  //   @Column({ length: 45, nullable: true })
  //   emp_image?: string;

  @CreateDateColumn()
  emp_created?: Date;

  @UpdateDateColumn()
  emp_updated?: Date;

  @OneToOne(() => User, (user) => user.employee)
  users: User[];
}
