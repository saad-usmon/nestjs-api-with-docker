import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/entities.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  async getById(id: string) {
    const coffee = (await this.userRepository.findOneById(id)) || undefined;
    if (!coffee) {
      throw new NotFoundException(
        `No data was found for the user with this #${id}`,
      );
    } else {
      return coffee;
    }
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: String(+id),
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`There is no user found with this #${id}`);
    } else {
      return this.userRepository.save(user);
    }
  }

  async remove(id: string) {
    const user = await this.getById(id);
    return this.userRepository.remove(user);
  }
}
