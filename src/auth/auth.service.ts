import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './signup.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { ClientKafka } from '@nestjs/microservices';
import { ref } from 'process';
import { Employee } from 'src/employees/employees.entity';

@Injectable()
export class AuthService {
  KafkaClient: any;
  constructor(
    private usersService: UsersService,
    private employeesService: EmployeesService,
    private jwtService: JwtService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.user_password === pass) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const employee = await this.employeesService.findOne(user.emp_code);
    const AC_payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
      floor_picking: employee.emp_floor || null,
    };
    const RT_payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
      type: 'refresh',
    };
    const access_token = await this.jwtService.signAsync(AC_payload, {
      expiresIn: '10h',
    });
    const refresh_token = await this.jwtService.signAsync(RT_payload, {
      expiresIn: '1d',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.usersService.updateRefreshToken(user.user_id, refresh_token);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await this.jwtService.verifyAsync(refreshToken);
    if (!payload) {
      throw new Error('Invalid refresh token');
    }
    const user = await this.usersService.findOneById(payload.user_id);
    if (!user || user.refresh_token !== refreshToken) {
      throw new ForbiddenException();
    }

    const newAccessToken = await this.jwtService.signAsync({
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
    });

    const newRefreshToken = await this.jwtService.signAsync(
      {
        user_id: user.user_id,
        username: user.user_username,
        emp_code: user.emp_code,
        user_created: user.user_created,
        type: 'refresh',
      },
      {
        expiresIn: '1d',
      },
    );
    await this.usersService.updateRefreshToken(user.user_id, newRefreshToken);
    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async deleteUser(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    void this.employeesService.update(user.emp_code, {
      emp_exitWork: new Date().toISOString(),
    });

    void this.usersService.delete(userId);
    this.kafkaClient.emit('emp_deleted', {
      emp_code: user.emp_code,
    });
    return { message: 'User deleted successfully' };
  }

  async signup(signupDto: SignupDto) {
    const {
      user_username,
      user_password,
      emp_code,
      emp_nickTH,
      emp_nickEng,
      emp_titleTH,
      emp_titleEng,
      emp_firstTH,
      emp_firstEng,
      emp_lastTH,
      emp_lastEng,
      emp_idCard,
      emp_idVat,
      vat_code,
      emp_idSSO,
      emp_sex,
      emp_phone,
      emp_email,
      dep_code,
      pos_code,
      bank_code,
      emp_bankNo,
      emp_birthdate,
      emp_datetime,
      emp_dateWork,
      emp_saveWork,
      emp_exitWork,
      type_code,
      pay_code,
      emp_floor,
    } = signupDto;
    const employee: Employee = await this.employeesService.create({
      emp_code,
      emp_nickTH,
      emp_nickEng,
      emp_titleTH,
      emp_titleEng,
      emp_firstTH,
      emp_firstEng,
      emp_lastTH,
      emp_lastEng,
      emp_idCard,
      emp_idVat,
      vat_code,
      emp_idSSO,
      emp_sex,
      emp_phone,
      emp_email,
      dep_code,
      pos_code,
      bank_code,
      emp_bankNo,
      emp_birthdate,
      emp_datetime,
      emp_dateWork,
      emp_saveWork,
      emp_exitWork,
      type_code,
      emp_floor,
      pay_code,
      emp_id: 0,
      users: [],
    });

    const user = await this.usersService.create({
      user_username,
      user_password,
      emp_code: employee.emp_code,
      refresh_token: '',
    });

    const payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
      floor_picking: employee.emp_floor || null,
    };

    const access_token = this.jwtService.sign(payload);

    this.kafkaClient.emit('emp_created', {
      emp_code: employee.emp_code,
      emp_id: employee.emp_id,
      emp_name: employee.emp_nickTH,
    });

    this.kafkaClient.emit('emp_created_order_picking', {
      emp_code: employee.emp_code,
      emp_id: employee.emp_id,
      emp_name:
        `${employee.emp_firstTH || ''} ${employee.emp_lastTH || ''}`.trim(),
      emp_nickname: employee.emp_nickTH,
      emp_tel: employee.emp_phone,
      emp_floor: employee.emp_floor || null,
    });

    return {
      message: 'SignUp Success',
      access_token,
      user,
    };
  }
}
