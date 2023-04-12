import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private readonly users:CreateUserDto[] =[
    {
      id:1,
      name:'Marius',
      username:'marius',
      password:'password',
    },
    {
      id:2,
      name:'Marius2',
      username:'marius2',
      password:'password2',
    }
  ]


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username:string):Promise<CreateUserDto|undefined>  {
    return this.users.find(user => user.username === username)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
