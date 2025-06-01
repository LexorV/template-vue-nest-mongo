import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUsers() {
    try {
      return await this.userModel.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
