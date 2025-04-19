import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from 'src/employees/employees.entity';

// export enum UserCode {
//   ADMIN = 'ADMIN',
//   STAFF = 'STAFF',
// }

// export enum UserRole {
//   SUPER_ADMIN = 'SUPER_ADMIN',
//   MANAGER = 'MANAGER',
//   USER = 'USER',
// }

// export enum UserStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   PENDING = 'PENDING',
// }

export enum UserLogin {
  FALSE = '0',
  TRUE = '1',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 6 })
  emp_code: string;

  //   @Column({ type: 'enum', enum: UserCode })
  //   user_code: UserCode;

  @Column({ length: 16 })
  user_username: string;

  @Column({ length: 255 })
  user_password?: string;

  @Column({ length: 1000 })
  refresh_token?: string;

  //   @Column({ type: 'enum', enum: UserRole })
  //   user_role: UserRole;

  //   @Column({ type: 'enum', enum: UserStatus })
  //   user_status: UserStatus;

  @CreateDateColumn()
  user_created: Date;

  @Column({ length: 255, nullable: true })
  otp_secret?: string;

  @Column({ length: 50, nullable: true })
  oauth_provider?: string;

  @Column({ length: 100, nullable: true })
  oauth_id?: string;

  @Column({ type: 'enum', enum: UserLogin, default: UserLogin.FALSE })
  user_login: UserLogin;

  @Column({ type: 'datetime', nullable: true })
  user_logindate?: Date;

  @UpdateDateColumn()
  user_updated: Date;

  @OneToOne(() => Employee, (employee) => employee.users)
  @JoinColumn({ name: 'emp_code', referencedColumnName: 'emp_code' })
  employee: Employee;
}
