import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/created-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(data: CreateUserDto) {
    const check = await this.userRepository.findOne({
      where: [
        { email: data.email },
        { phone: data.phone },
      ]
    })

    if (check) {
      throw new ConflictException("Phone or email alrealy exists")
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt)

    const newUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
    })

    return await this.userRepository.save(newUser)
  }

  // 2. Tìm user theo Phone và LẤY CẢ PASSWORD (phục vụ login)
  async findByPhoneWithPassword(phone: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.phone = :phone', { phone })
      .getOne();
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    return user
  }

  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({ where: { phone } })
    if (!user) {
      throw new HttpException("Không tìm thấy phone", HttpStatus.UNAUTHORIZED)
    }

    const status = await bcrypt.compareSync(password, user.password)
    if (!status) {
      throw new HttpException("Mật khẩu sai", HttpStatus.UNAUTHORIZED)
    }

    return user
  }
}
