import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './signup.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { ClientKafka } from '@nestjs/microservices';

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
    const AC_payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
    };
    const RT_payload = {
      user_id: user.user_id,
      username: user.user_username,
      emp_code: user.emp_code,
      user_created: user.user_created,
      type: 'refresh',
    };
    const access_token = await this.jwtService.signAsync(AC_payload, {
      expiresIn: '1h',
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    void this.employeesService.update(user.emp_code, {
      emp_exitWork: new Date(),
    });

    void this.usersService.delete(userId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.kafkaClient.emit('emp_deleted', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      emp_code: userId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
    } = signupDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const employee = await this.employeesService.create({
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
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.usersService.create({
      user_username,
      user_password,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      emp_code: employee.emp_code,
    });

    const payload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      user_id: user.user_id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      username: user.user_username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      emp_code: user.emp_code,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      user_created: user.user_created,
    };

    const access_token = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.kafkaClient.emit('emp_created', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      emp_code: employee.emp_code,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      emp_id: employee.emp_id,
    });

    return {
      message: 'SignUp Success',
      access_token,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user,
    };
  }
}
