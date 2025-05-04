import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { user_username: username },
    });
    return user ?? undefined;
  }
  create(userData: any): Promise<User> {
    return this.userRepository.save(userData);
  }
  async delete(user_id: number): Promise<void> {
    await this.userRepository.delete({ user_id });
  }
  async findOneById(user_id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    return user ? user : undefined;
  }
  async updateRefreshToken(user_id: number, refresh_token: string) {
    await this.userRepository.update(user_id, {
      refresh_token: refresh_token,
    });
  }
}
